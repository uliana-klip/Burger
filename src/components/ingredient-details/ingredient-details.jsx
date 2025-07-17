import PropTypes from 'prop-types';

import { ingredientPropType } from '../../utils/prop-types';

import styles from './ingredient-details.module.css';

export const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={styles.modal}>
      <img src={ingredient.image} alt={ingredient.name} className={styles.modal_img} />

      <span className={styles.modal_name}>{ingredient.name}</span>
      <section className={styles.modal_info}>
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

IngredientDetails.propTypes = {
  ingredient: ingredientPropType.isRequired,
  onClose: PropTypes.func.isRequired,
};
