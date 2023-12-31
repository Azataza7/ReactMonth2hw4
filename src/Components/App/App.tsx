import {responseJSON} from '../../types';
import MessageContainer from '../MessageContainer/MessageContainer';
import {useEffect, useState} from 'react';
import SendMessageForm from '../SendMessageForm/SendMessageForm';
import Preloader from '../Preloader/Preloader';

const URL: string = 'http://146.185.154.90:8000/messages';

const App = () => {
  const [messages, setMessages] = useState<responseJSON[]>([]);
  const [datetime, setDatetime] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
        setDatetime(resultJson[0].datetime);
        setMessages((prevState) =>
          [...resultJson, ...prevState.slice(0, 15 - resultJson.length)]
        );
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    const getPostList = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(URL);

        if (!response.ok) {
          console.log(response.status);
          return;
        }

        const result: responseJSON[] = await response.json();
        if (result.length > 0) {
          setMessages([...result].reverse());
          setDatetime(result[result.length - 1].datetime);
        }
        setIsLoading(false);
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
      {isLoading ? (
        <Preloader display={true}/>
      ) : (<MessageContainer messageList={messages}/>
      )}
    </>
  );
};

export default App;
