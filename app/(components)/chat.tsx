'use client';

import React from 'react';
import { ref, deleteObject } from 'firebase/storage';

import type { Chat } from 'db/models/chatsModel';
import Image from 'next/image';
import { trpc } from './clientWrapper';
import timeAgo from './timerAgo';
import storage from '../firebaseConfig';

interface Props {
  userId: string;
  data: Chat;
}

export default function Chats({ userId, data }: Props) {
  // const { refetch } = trpc.chatsRoute.chats.useQuery();

  const mutation = trpc.chatsRoute.deleteMsg.useMutation({
    onSuccess: () => {
      // refetch();
      // console.log('success');
      if (data.image) {
        const pictureRef = ref(storage, data?.image);
        // 2.
        deleteObject(pictureRef)
          .then(() => {
            console.log('Picture is deleted successfully!');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });

  const msgDeleteHandler = () => {
    // socket.emit('sendMessage', postmessage);

    // eslint-disable-next-line no-underscore-dangle
    mutation.mutate({ Id: data._id });
  };

  return (
    <ol className="chat">
      <li className={userId === data.sender ? 'self' : 'other'}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          className="deleteMsg"
          role="button"
          tabIndex="0"
          onClick={msgDeleteHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z" />
          </svg>
        </div>
        <div className="avatar" />
        <div className="msg">
          <p>{data.message}</p>
          {data.image ? (
            <div className="msgImage">
              {/* next image doesn't working properly here, had a issues with
              lazy loading */}
              <img src={data?.image} draggable={false} alt="chat" />
            </div>
          ) : null}
          <time>{timeAgo(data.createdAt)}</time>
        </div>
      </li>
    </ol>
  );
}
