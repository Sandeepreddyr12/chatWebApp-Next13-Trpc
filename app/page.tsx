'use client';

// import { dehydrate } from '@tanstack/react-query';
import React from 'react';
// import getQueryClient from 'utils/getQueryClient';
// import HydrateClient from 'utils/hydrateClient';
// import Chat from './chat';
import { trpc } from './clientWrapper';

type Props = {};

function page({}: Props) {
  const result = trpc.chatsRoute.chats.useQuery(undefined);
  console.log(result?.data);

  return (
    // <HydrateClient state={dehydratedState}>
    // <div>
    //   <div className="menu">
    //     <div className="back">
    //       <i className="fa fa-chevron-left" />
    //       {/* <img src="https://i.imgur.com/DY6gND0.png" draggable="false" /> */}
    //     </div>
    //     <div className="name">Hello world</div>
    //     <div className="last">18:09</div>
    //   </div>
    //   <Chat />
    //   {/* <input className="textarea" type="text" placeholder="Type here!" /> */}
    //   <div className="emojisss">
    //     <img src="app\attachIcon.png" alt="attach" />
    //   </div>
    //   <div>send</div>
    // </div>
    // </HydrateClient>
    <div>hi there</div>
  );
}

export default page;
