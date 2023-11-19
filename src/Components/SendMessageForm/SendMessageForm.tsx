import React, {useState} from 'react';

const SendMessageForm = ({sendMessage}) => {
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')

  const handleSubmit = e => {
    e.preventDefault();
    if (message.trim() !== '') {
      sendMessage(message, username);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={event => setUsername(event.target.value)}
        placeholder="username"
      />
      <input
        type="text"
        value={message}
        onChange={event => setMessage(event.target.value)}
        placeholder="write text"
      />
      <button type="submit" className="btn btn-success">Send</button>
    </form>
  );
};

export default SendMessageForm;