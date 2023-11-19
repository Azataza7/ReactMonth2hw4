import {responseJSON} from '../../types';
import MessageContainer from '../MessageContainer/MessageContainer';
import {useEffect, useState} from 'react';
import SendMessageForm from '../SendMessageForm/SendMessageForm';

const URL: string = 'http://146.185.154.90:8000/messages';

const App = () => {
  const [messages, setMessages] = useState<responseJSON[]>([]);
  const [datetime, setDatetime] = useState('');

  const sendMessage = async (messageText, username) => {
    const data = new URLSearchParams();
    data.set('message', messageText);
    data.set('author', username);

    await fetch(URL, {
      method: 'post',
      body: data,
    });
  };

  const awaitNewMessage = async () => {
    try {
      const newMessageResponse = await fetch(`${URL}?datetime=${datetime || ''}`);

      if (!newMessageResponse.ok) {
        console.log(newMessageResponse.status);
        return;
      }

      const resultJson: responseJSON[] = await newMessageResponse.json();

      if (resultJson.length > 0) {
        setDatetime(resultJson[resultJson.length - 1].datetime);
        setMessages((prevState) =>
          [...resultJson, ...prevState.splice(0, 15 - resultJson.length)]
        );
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }

    console.log(messages);
  };

  useEffect(() => {
    const getPostList = async () => {
      try {
        const response = await fetch(URL);

        if (!response.ok) {
          console.log(response.status);
          return;
        }

        const result: responseJSON[] = await response.json();
        if (result.length > 0) {
          setDatetime(result[result.length - 1].datetime);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    void getPostList();
  }, []);


  useEffect(() => {
    const intervalId = setInterval(async () => {
      await awaitNewMessage();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [datetime]);

  return (
    <>
      <SendMessageForm sendMessage={sendMessage}/>
      <MessageContainer messageList={messages}/>
    </>
  );
};

export default App;
