'use client';

import React from 'react';

type Props = {};

export default function Chat({}: Props) {
  return (
    <ol className="chat">
      <li className="other">
        <div className="avatar">
          {/* <img src="https://i.imgur.com/DY6gND0.png" draggable="false" /> */}
        </div>
        <div className="msg">
          <p>Hello!</p>
          <p>how going on</p>
          <div className="msg">
            <img src="https://i.imgur.com/QAROObc.jpg" draggable="false" />
            <time>20:19</time>
          </div>
          <time>20:17</time>
        </div>
      </li>
      <li className="self">
        <div className="avatar">
          {/* <img src="https://i.imgur.com/HYcn9xO.png" draggable="false" /> */}
        </div>
        <div className="msg">
          <p>Puff...</p>
          <p>aaaaaaaaaaaa...</p>
          <p>aaaaa</p>
          <time>20:18</time>
        </div>
      </li>
    </ol>
  );
}
