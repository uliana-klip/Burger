import { ingredientPropType } from '../../utils/prop-types';

import styles from './ingredient-details.module.css';

export const IngredientDetails = ({ ingredient }) => {
  const { image, name, calories, proteins, fat, carbohydrates } = ingredient;

  return (
    <div className={styles.modal}>
      <img src={image} alt={name} className={styles.modal_img} />

      <span className={styles.modal_name}>{name}</span>
      <section className={styles.modal_info}>
        <span>
          Калории,ккал <br />
          {calories}
        </span>
        <span>
          Белки, г<br />
          {proteins}
        </span>
        <span>
          Жиры, г<br />
          {fat}
        </span>
        <span>
          Углеводы, г<br />
          {carbohydrates}
        </span>
      </section>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredientPropType.isRequired,
};
