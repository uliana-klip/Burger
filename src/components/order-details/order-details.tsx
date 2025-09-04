import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

import type { TRootState } from '@/types';

import styles from './order-details.module.css';

export const OrderDetails = (): React.JSX.Element | null => {
  const orderNumber = useSelector<TRootState, number | null>(
    (state) => state.order.orderNumber
  );
  return (
    <div>
      <section className={styles.modal}>
        <h3 className={styles.order_number}>{orderNumber}</h3>
        <span className={styles.order_label}>идентификатор заказа</span>
        <CheckMarkIcon type="primary" className={styles.order_status_icon} />
        <span className={styles.order_status_text}>Ваш заказ начали готовить</span>
        <span className={styles.order_wait_text}>
          Дождитесь готовности на орбитальной станции
        </span>
      </section>
    </div>
  );
};
