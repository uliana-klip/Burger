import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

import styles from './order-details.module.css';

export const OrderDetails = () => {
  const orderNumber = useSelector((state) => state.order.orderNumber);
  return (
    <div>
      <section className={styles.modal}>
        <h3 className={styles.order_number}>{orderNumber}</h3>
        <p className={styles.order_label}>идентификатор заказа</p>
        <CheckMarkIcon type="primary" className={styles.order_status_icon} />
        <p className={styles.order_status_text}>Ваш заказ начали готовить</p>
        <p className={styles.order_wait_text}>
          Дождитесь готовности на орбитальной станции
        </p>
      </section>
    </div>
  );
};
