import CatImage from '@/pages/cat/ui/CatImage';
import styles from './CatPage.module.scss';
import { catPageModel } from './model/catPageModel';

export const CatPage = () => {
  const { description, setDescription, phrase, getNewPhrase, catData } =
    catPageModel();
  return (
    <>
      <section className={styles.cat}>
        <h1 className={styles.cat__name}>{`Ваш кот ${catData.name}`}</h1>
        <CatImage color={catData.color} shadow={true} />
        {!description ? (
          <button
            onClick={() => setDescription(true)}
            className={styles['cat__about-btn']}
          >
            Подробнее о коте
          </button>
        ) : (
          <div
            onClick={() => setDescription(false)}
            className={styles.cat__details}
          >
            <h3
              className={styles['cat__datails-item']}
            >{`Роль: ${catData.role}`}</h3>
            <h3
              className={styles['cat__datails-item']}
            >{`Описание: ${catData.description}`}</h3>
            <button className={styles['cat__about-btn']}>Скрыть</button>
          </div>
        )}
      </section>
      <section className={styles.cat__phrases}>
        {phrase ? (
          <>
            <h3 className={styles['cat__phrases-text']}>{phrase}</h3>
            <button
              onClick={() => getNewPhrase()}
              className={styles['cat__phrases-btn']}
            >
              Скажи ещё что-нибудь
            </button>
          </>
        ) : (
          <button onClick={() => getNewPhrase()} className={styles.cat__btn}>
            Скажи что-нибудь
          </button>
        )}
      </section>
    </>
  );
};
