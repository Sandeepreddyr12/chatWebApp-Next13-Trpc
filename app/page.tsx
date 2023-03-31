'use client';

// import { dehydrate } from '@tanstack/react-query';
import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
  Fragment,
} from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import getQueryClient from 'utils/getQueryClient';
// import HydrateClient from 'utils/hydrateClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Image from 'next/image';
import type { NextPage } from 'next';
import Chats from './(components)/chat';
import { trpc } from './(components)/clientWrapper';
import userId from './(components)/userID';
import Loader from './(components)/cssLoader';
import storage from './firebaseConfig';
import loading from './loading';

// type Props = {};

const MyApp: NextPage = () => {
  // const [newMessage, setnewMessage] = useState<string>('');
  const newMessage = useRef<HTMLInputElement | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [msgSort, setMsgSort] = useState<string>('NewestFirst');
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    null
  );
  const scrollRef = useRef<HTMLElement>(null);
  const scrollRefss = useRef<HTMLElement>(null);
  const [scrollHelper, setScrollHelper] = useState(false);

  const intObserver = useRef();
  console.log(scrollRefss);

  const userID = useMemo(() => {
    return userId();
  }, []);
  useEffect(() => {
    // console.log(scrollHelper, scrollRef, scrollRef.current, '♥');

    if (scrollRef?.current && !scrollHelper) {
      scrollRef.current.scrollIntoView();
      setScrollHelper(true);
    }
  });

  const {
    isLoading,
    fetchNextPage, // function
    hasNextPage, // boolean
    isFetchingNextPage, // boolean
    data,
    status,
    error,
  } = trpc.chatsRoute.chats.useInfiniteQuery(
    { sortBy: msgSort },
    {
      select: (data) => ({
        pages: [...data.pages].reverse(),
        // pageParams: [...data.pageParams].reverse(),
      }),
      getNextPageParam: (lastPage, allPages) => lastPage.nextPage || undefined,
    }
    // initialCursor: 1, // <-- optional you can pass an initialCursor
  );

  const mutation = trpc.chatsRoute.addMsg.useMutation({
    onSuccess: () => {
      // refetch();
      // console.log('success');
    },
  });

  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 10000000) {
      setImageFile(files[0]);
    } else {
      console.log('File size to large');
    }
  };

  const pickImageHandler = () => {
    if (filePickerRef.current) {
      filePickerRef.current.click();
    }
  };

  const PostMessage = (Url: string | null = null) => {
    const postmessage = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      message: newMessage.current?.value!,
      sender: userID,
      image: Url,
    };

    mutation.mutate(postmessage);
    setImageFile(null);
    setPreviewUrl(null);
    (newMessage.current as HTMLInputElement).value = '';
    setDownloadURL(null);
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView();
    }
  };

  const handleUploadFile = () => {
    const { name } = imageFile;
    const storageRef = ref(storage, `chatImg/${name}`);
    uploadBytesResumable(storageRef, imageFile).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          setDownloadURL(url);
          PostMessage(url);
        })
        .catch(() => {
          console.log('error occured, unable to upload file');
        });
    });
  };

  const newMessageHandler = () => {
    if (newMessage.current?.value.trim() === '') {
      return;
    }

    if (imageFile) {
      handleUploadFile();
    } else {
      PostMessage();
    }

    // socket.emit('sendMessage', postmessage);
  };

  console.log(scrollRef, 'scroll ref');

  useEffect(() => {
    if (!imageFile) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(imageFile);
  }, [imageFile]);

  const imagePreview = imageFile ? (
    <div className="imagePreview">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className="removeBtn"
        role="button"
        tabIndex="0"
        onClick={() => {
          setImageFile(null);
          setPreviewUrl(null);
        }}
      >
        &times;
      </div>
      {previewUrl && <Image src={previewUrl} fill alt="PreviewImg" />}
    </div>
  ) : (
    <div>
      <input
        type="file"
        ref={filePickerRef}
        placeholder="Select file to upload"
        style={{ display: 'none' }}
        accept=".jpg,.png,.jpeg"
        onChange={(files) => handleSelectedFile(files.target.files)}
      />
      <button
        type="button"
        onClick={pickImageHandler}
        // style={{ marginBottom: '1rem' }}
        className="button"
      >
        📎
      </button>
    </div>
  );

  console.log(hasNextPage, 'hasnext page');

  const lastPostRef = useCallback(
    (post) => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((messages) => {
        if (messages[0].isIntersecting && hasNextPage && scrollHelper) {
          console.log('We are near the last post!', scrollHelper);
          fetchNextPage();
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage, scrollHelper]
  );

  if (error) {
    return <div className="noMessage">Oh noooooooo something went wrong!</div>;
  }
  return (
    <div className="chatBody">
      <div className="selectInput">
        <select
          onChange={(e) => setMsgSort(e.target.value)}
          id="quantity"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Sort by Time</option>
          <option value="NewestFirst">sort newest to oldest(default)</option>
          <option value="oldestFirst">sort oldest to newest</option>
        </select>
      </div>
      <div style={{ marginTop: '6rem' }} className="chats">
        {/* eslint-disable-next-line no-nested-ternary */}
        {isLoading ? (
          <div className="chatLoader">
            <Loader />
          </div>
        ) : (
          <div>
            {hasNextPage && <div ref={lastPostRef}>Loading more...</div>}
            {data.pages.map((group, pIndex) => {
              return (
                <Fragment key={pIndex}>
                  {group.messages?.length ? (
                    group.messages.map((msg, ind) => {
                      // if (ind === 0) {
                      //   return (
                      //     // eslint-disable-next-line no-underscore-dangle
                      //     <div key={msg._id.toString()} ref={lastPostRef}>
                      //       <Chats userId={userID} data={msg} />
                      //     </div>
                      //   );
                      // }
                      // eslint-disable-next-line no-return-assign
                      return (
                        // eslint-disable-next-line no-underscore-dangle
                        <div key={msg._id.toString()} ref={scrollRef}>
                          <Chats userId={userID} data={msg} />
                        </div>
                      );
                    })
                  ) : (
                    <div className="noMessage">No messages, lets chat</div>
                  )}
                </Fragment>
              );
            })}
          </div>
        )}
      </div>
      <div className="inputs">
        <input
          className="textarea"
          type="text"
          // value={newMessage}
          // onChange={(e) => setnewMessage(e.target.value)}
          ref={newMessage}
          placeholder="enter msg here"
        />
        <div className="emoji">{imagePreview}</div>
        <button
          type="submit"
          onClick={newMessageHandler}
          className="Submitbutton"
        >
          send
        </button>
      </div>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </div>
  );
};

export default MyApp;
