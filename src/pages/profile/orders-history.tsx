import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './orders-history.module.css';

export const OrdersHistory = (): React.JSX.Element | null => {
  return (
    <div className={styles.card_order}>
      <section className={styles.card_order_header}>
        <span className={styles.order_number}>#034534</span>
        <span className={styles.order_date}>Сегодня, 13:20</span>
      </section>
      <span className={styles.card_order_name}>Interstellar бургер</span>
      <span>Готовится</span>
      <section className={styles.card_order_footer}>
        <section /*className={styles.card_order_img}*/>
          <span>images ingredients</span>
        </section>
        <section className={styles.card_order_price}>
          <span>560</span>
          <CurrencyIcon type="primary" />
        </section>
      </section>
    </div>
  );
};
