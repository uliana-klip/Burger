import { useAppSelector } from '@/services/redux/hooks';
import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-details.module.css';

export const OrderDetails = (): React.JSX.Element | null => {
  const orderNumber = useAppSelector((state) => state.order.orderNumber);
  return (
    <div>
      <section data-testid="order-modal" className={styles.modal}>
        <h3 data-testid="order-number" className={styles.order_number}>
          {orderNumber}
        </h3>
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
