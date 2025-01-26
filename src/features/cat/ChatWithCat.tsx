import { FC } from 'react';

import { messageWithCatInterface } from '@/shared/types';
import styles from './ChatWithCat.module.scss'

export interface chatWithCatPropsInterface {
  data: messageWithCatInterface[];
}

export const ChatWithCat: FC<chatWithCatPropsInterface> = ({ data }) => {
  return (
    <>
      {data.map((item, index) => {
        return (
          <p className={item.author === 'bot' ? styles.message__bot: styles.message__user} key={index}>
            {item.content}
          </p>
        );
      })}
    </>
  );
};
