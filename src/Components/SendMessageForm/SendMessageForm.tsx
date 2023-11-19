import React, {useState} from 'react';

const SendMessageForm = ({sendMessage}) => {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (message.trim() !== '') {
      sendMessage(message, username);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-sm-column w-100">
      <input
        type="text"
        value={username}
        onChange={event => setUsername(event.target.value)}
        placeholder="username"
        className="p-2"
      />
      <textarea
        value={message}
        onChange={event => setMessage(event.target.value)}
        placeholder="write text"
        className="p-2"
      />
      <button type="submit" className="btn btn-success">Send</button>
    </form>
  );
};

export default SendMessageForm;