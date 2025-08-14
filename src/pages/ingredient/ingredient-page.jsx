import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './ingredient-page.module.css';

export const IngredientPage = () => {
  const { id } = useParams();
  const isLoading = useSelector((state) => state.ingredients.ingredientRequest);
  const ingredient = useSelector((state) =>
    state.ingredients.ingredients.find((ingredient) => ingredient._id === id)
  );

  if (isLoading)
    return (
      <div className={styles.window}>
        <Preloader />
      </div>
    );
  else if (ingredient)
    return (
      <div className={styles.modal}>
        <span className={styles.title}>Детали ингредиента</span>
        <img src={ingredient.image} alt={ingredient.name} className={styles.modal_img} />
        <section className={styles.modal_footer}>
          <span className={styles.modal_name}>{ingredient.name}</span>
          <section className={styles.modal_info}>
            <span>
              Калории,ккал <br />
              {ingredient.calories}
            </span>
            <span>
              Белки, г<br />
              {ingredient.proteins}
            </span>
            <span>
              Жиры, г<br />
              {ingredient.fat}
            </span>
            <span>
              Углеводы, г<br />
              {ingredient.carbohydrates}
            </span>
          </section>
        </section>
      </div>
    );
  else return <div className={styles.window}>ингредиент не найден</div>;
};
