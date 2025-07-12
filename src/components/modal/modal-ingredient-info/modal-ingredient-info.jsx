import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

import { ingredientPropType } from '../../../utils/prop-types';

import styles from './modal-ingredient-info.module.css';

export const ModalIngredientInfo = ({ ingredient, onClose }) => {
  return (
    <div className={styles.modal_info}>
      <section className={styles.modal_header}>
        <h3>Детали ингредиента</h3>
        <CloseIcon onClick={onClose} />
      </section>

      <img src={ingredient.image}></img>
      <span className={styles.modal_name}>{ingredient.name}</span>
      <section className={styles.info}>
        <p>
          Калории, ккал <br />
          {ingredient.calories}
        </p>
        <p>
          Белки, г<br />
          {ingredient.proteins}
        </p>
        <p>
          Жиры, г<br />
          {ingredient.fat}
        </p>
        <p>
          Углеводы, г<br />
          {ingredient.carbohydrates}
        </p>
      </section>
    </div>
  );
};

ModalIngredientInfo.propTypes = {
  ingredient: ingredientPropType.isRequired,
  onClose: PropTypes.func.isRequired,
};
