import { useSelector } from 'react-redux';

import { getCoins } from '@/entities/coins/model/CoinsSlice';
import bankImg from '/img/bank.png';
import coinImg from '/img/coin.png';
import styles from './Bank.module.scss';

export const Bank = () => {
  const coins = useSelector(getCoins);
  return (
    <section className={styles.bank}>
      <img className={styles.bank__image} src={bankImg} alt="bank"></img>
      <h2 className={styles.bank__title}>Мой Счёт</h2>
      <div className={styles.bank__info}>
        <div className={styles['bank__info-wrapper']}>
          <h3 className={styles['bank__info-title']}>
            Монеток сейчас:
            <strong>{coins}</strong>
          </h3>
          <img
            className={styles['bank__info-image']}
            src={coinImg}
            alt="coin"
          />
          <img
            className={styles['bank__info-image']}
            src={coinImg}
            alt="coin"
          />
        </div>
        <button className={styles['bank__transfer-button']}>Перевести</button>
      </div>
    </section>
  );
};
