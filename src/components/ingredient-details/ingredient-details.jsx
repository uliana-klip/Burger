import { ingredientPropType } from '../../utils/prop-types';

import styles from './ingredient-details.module.css';

export const IngredientDetails = ({ ingredient }) => {
  const { image, name, calories, proteins, fat, carbohydrates } = ingredient;

  return (
    <div className={styles.modal}>
      <img src={image} alt={name} className={styles.modal_img} />

      <span className={styles.modal_name}>{name}</span>
      <section className={styles.modal_info}>
        <p>
          Калории, ккал <br />
          {calories}
        </p>
        <p>
          Белки, г<br />
          {proteins}
        </p>
        <p>
          Жиры, г<br />
          {fat}
        </p>
        <p>
          Углеводы, г<br />
          {carbohydrates}
        </p>
      </section>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredientPropType.isRequired,
};
