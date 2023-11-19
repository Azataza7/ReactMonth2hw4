import React from 'react';
import {responseJSON} from '../../types';

interface Props {
  messageItem: responseJSON
}

const MessageBox: React.FC<Props> = ({messageItem}) => {
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
    <div className="message-box">
      <span className="datetime">{formattedDateTime}</span>
      <span className="datetime">{messageItem.message}</span>
      <span className="datetime">{messageItem.author}</span>
    </div>
  );
};

export default MessageBox;