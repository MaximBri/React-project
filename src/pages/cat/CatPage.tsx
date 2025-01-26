import { memo } from 'react';

import { ChatWithCat } from '@/features/cat';
import { catPageModel } from './model/catPageModel';
import leftArrowSvg from '/img/left-arrow.svg';
import CatImage from '@/pages/cat/ui/CatImage';
import styles from './CatPage.module.scss';

export const CatPage = memo(() => {
  const {
    description,
    setDescription,
    loading,
    getNewPhrase,
    catData,
    messages,
    lastMessage,
  } = catPageModel();
  if (!catData.name) return null;
  return (
    <>
      <section className={styles.cat__info}>
        <h2 className={styles['cat__info-name']}>Кот {catData.name}</h2>
        <div className={styles['cat__info-image']}>
          <CatImage color={catData.color} shadow={true} />
        </div>
        <div className={styles['cat__info-item']}>
          <h3 className={styles['cat__item-title']}>Роль: </h3>
          <p className={styles['cat__item-text']}>{catData.role}</p>
        </div>
        <div className={styles['cat__info-item']}>
          <h3 className={styles['cat__item-title']}>Описание: </h3>
          <p className={styles['cat__item-text']}>{catData.description}</p>
        </div>
      </section>
      <section className={styles.cat}>
        <h2
          className={styles.cat__name}
        >{`Ваш кот-ассистент ${catData.name}`}</h2>
        <div className={styles.cat__body}>
          <div className={styles.cat__chat}>
            <div className={styles['cat__chat-messages']}>
              <ChatWithCat data={messages} />
              <div ref={lastMessage}></div>
            </div>
            <div className={styles['cat__chat-user-panel']}>
              <button
                onClick={() => getNewPhrase()}
                className={`${styles['cat__chat-btn']} ${loading ? styles['cat__chat-btn--disabled'] : ''}`}
                disabled={loading ? true : false}
              >
                Скажи что-нибудь
              </button>
            </div>
          </div>
          <div
            className={`${styles.cat__about} ${description ? styles['cat__about--closed'] : ''}`}
          >
            <img
              onClick={() => setDescription(!description)}
              className={`${styles['cat__about-close-btn']} ${!description ? styles['cat__about-close-btn--rotated'] : ''}`}
              src={leftArrowSvg}
              alt="close"
            ></img>
            <div className={styles['cat__about-wrapper']}>
              <CatImage color={catData.color} shadow={true} />
              <div className={styles.cat__details}>
                <h3
                  className={styles['cat__details-item']}
                >{`Роль: ${catData.role}`}</h3>
                <h3
                  className={styles['cat__details-item']}
                >{`Описание: ${catData.description}`}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});
