import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './modal-ingredient-info.module.css';

export const ModalIngredientInfo = ({ children, onClose }) => {
  return (
    <div className={styles.modal_info}>
      <section className={styles.modal_header}>
        <h3>Детали ингредиента</h3>
        <CloseIcon onClick={onClose} />
      </section>

      <img src={children.image}></img>
      <span className={styles.modal_name}>{children.name}</span>
      <section className={styles.info}>
        <p>
          Калории, ккал <br />
          {children.calories}
        </p>
        <p>
          Белки, г<br />
          {children.proteins}
        </p>
        <p>
          Жиры, г<br />
          {children.fat}
        </p>
        <p>
          Углеводы, г<br />
          {children.carbohydrates}
        </p>
      </section>
    </div>
  );
};
