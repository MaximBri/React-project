import Cookies from 'js-cookie';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { routes } from '@/shared/config/routes';
import { getAuth } from '@/entities/user/authorization/model/AuthSlice';
import { getCatData } from '@/entities/cat/model/CatSlice';
import { TOKEN } from '@/shared/globals/globalsData';
import { messageWithCatInterface } from '@/shared/types';
import { getNewPhraseFromCat } from '@/entities/cat/getNewPhraseFromCat';

export const catPageModel = () => {
  const navigate = useNavigate();
  const catData = useSelector(getCatData);
  const auth = useSelector(getAuth);
  const chatRef = useRef<HTMLDivElement>(null);
  const lastMessage = useRef<HTMLDivElement>(null);
  const [description, setDescription] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>();
  const [messages, setMessages] = useState<messageWithCatInterface[]>([
    {
      content:
        'Привет! Я твой личный кот-ассистент. Я могу говорить случайные фразы. Для этого нажми кнопку ниже',
      author: 'bot',
    },
  ]);

  const scroollToBottom = () => {
    if (lastMessage) {
      lastMessage.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pushMessage = useCallback((message: messageWithCatInterface) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  const getNewPhrase = useCallback(() => {
    setLoading(true);
    pushMessage({ content: 'Скажи ещё что-нибудь', author: 'user' });
    setTimeout(async () => {
      const token = Cookies.get(TOKEN);
      if (token) {
        getNewPhraseFromCat(pushMessage, setLoading, token);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (catData.name === '') {
      navigate(routes.main.home.path);
    }
  }, [auth, catData.name]);

  useEffect(() => {
    if (messages.length !== 1) scroollToBottom();
  }, [messages]);

  return {
    description,
    setDescription,
    loading,
    getNewPhrase,
    catData,
    messages,
    pushMessage,
    chatRef,
    lastMessage,
  };
};
