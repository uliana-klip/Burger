import { CloseIcon, CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './modal-order-details.module.css';

export const ModalOrderDetails = ({ onClose }) => {
  return (
    <div>
      <section className={styles.close} onClick={onClose}>
        <CloseIcon type="primary" />
      </section>
      <section className={styles.modal_order}>
        <h3 className={styles.order_number}>034536</h3>
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
