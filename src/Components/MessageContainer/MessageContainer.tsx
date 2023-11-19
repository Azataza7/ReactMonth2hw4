import React from 'react';
import MessageBox from './MessageBox';
import {responseJSON} from '../../types';

interface Props {
  messageList: responseJSON[];
}

const MessageContainer: React.FC<Props> = ({messageList}) => {
  return (
    <div>
      {messageList.map((item) => (
        <MessageBox key={item._id} messageItem={item}/>
      ))}
    </div>
  );
};

export default MessageContainer;