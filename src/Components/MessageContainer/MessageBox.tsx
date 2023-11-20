import React from 'react';
import {responseJSON} from '../../types';
import './MessageContainer.css';

interface Props {
  messageItem: responseJSON;
}

const MessageBox:React.FC<Props> = React.memo(({messageItem}) => {
  const utcDate = messageItem.datetime;
  const dateInUTC = new Date(utcDate);

  const year: number = dateInUTC.getFullYear();
  const month: string = ('0' + (dateInUTC.getMonth() + 1)).slice(-2);
  const day: string = ('0' + dateInUTC.getDate()).slice(-2);
  const hours: string = ('0' + dateInUTC.getHours()).slice(-2);
  const minutes: string = ('0' + dateInUTC.getMinutes()).slice(-2);
  const seconds: string = ('0' + dateInUTC.getSeconds()).slice(-2);

  const formattedDateTime: string = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return (
    <div className="message-box ">
      <p className="author text-bg-success p-1">{messageItem.author}</p>
      <p className="datetime text-bg-success">{formattedDateTime}</p>
      <p className="message-text">{messageItem.message}</p>
    </div>
  );
});

export default MessageBox;