import React from 'react';
import Chat from './chat';

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <div className="menu">
        <div className="back">
          <i className="fa fa-chevron-left" />
          {/* <img src="https://i.imgur.com/DY6gND0.png" draggable="false" /> */}
        </div>
        <div className="name">Hello world</div>
        <div className="last">18:09</div>
      </div>
      <Chat />
      {/* <input className="textarea" type="text" placeholder="Type here!" /> */}
      <div className="emojisss">
        <img src="app\attachIcon.png" alt="attach" />
      </div>
      <div>send</div>
    </div>
  );
}
