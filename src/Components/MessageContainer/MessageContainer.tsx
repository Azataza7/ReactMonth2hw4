import React from 'react';
import MessageBox from './MessageBox';
import {responseJSON} from '../../types';
import './MessageContainer.css';

interface Props {
  messageList: responseJSON[];
}

const MessageContainer: React.FC<Props> = React.memo(({messageList}) => {

  const message = (
    messageList.map((item, i) => (
      <MessageBox key={i} messageItem={item}/>
    ))
  )

  return (
    <div className="message-container">
      {message}
    </div>
  );
});

export default MessageContainer;