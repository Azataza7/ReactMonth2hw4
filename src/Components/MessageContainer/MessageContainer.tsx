import React from 'react';
import MessageBox from './MessageBox';
import {responseJSON} from '../../types';
import './MessageContainer.css';

interface Props {
  messageList: responseJSON[];
}

const MessageContainer: React.FC<Props> = ({messageList}) => {
  return (
    <div className="message-container">
      {messageList.map((item) => (
        <MessageBox key={item._id} messageItem={item}/>
      ))}
    </div>
  );
};

export default MessageContainer;