import React from 'react';
import MessageBox from './MessageBox';
import {responseJSON} from '../../types';
import './MessageContainer.css';

interface Props {
  messageList: responseJSON[];
}

const MessageContainer: React.FC<Props> = React.memo(({messageList}) => {
  return (
    <div className="message-container">
      {messageList.map((item, i) => (
        <MessageBox key={i} messageItem={item}/>
      ))}
    </div>
  );
});

export default MessageContainer;