import { getAuth } from '@/app/store/slices/AuthSlice';
import { getExisting } from '@/app/store/slices/CatSlice';
import {
  getAuthWindow,
  getCatWindow,
  getRegisterWindow,
} from '@/app/store/slices/WindowsSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const headerModel = () => {
  const auth = useSelector<any, boolean>(getAuth);
  const authWindow = useSelector(getAuthWindow);
  const registerWindow = useSelector(getRegisterWindow);
  const catWindow = useSelector(getCatWindow);
  const catExisting = useSelector(getExisting);
  let userName = useSelector<any, string>((state) => state.auth.data.name);
  const [width, setWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    const f = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', f);
    return () => {
      window.removeEventListener('resize', f);
    };
  }, []);
  const countSymb = width > 768 ? 9 : 1;
  if (!userName) userName = 'User';
  if (userName.length >= countSymb) {
    userName = userName.substring(0, countSymb);
    if (width > 768) userName += '...';
  }

  return {
    auth,
    authWindow,
    registerWindow,
    catWindow,
    catExisting,
    width,
    userName,
  };
};
