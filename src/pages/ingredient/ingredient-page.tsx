import { useAppSelector } from '@/services/redux/hooks';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';

import type { TIngredientModal } from '@/types';

import styles from './ingredient-page.module.css';

type TParams = {
  id: string;
};

export const IngredientPage = (): React.JSX.Element | null => {
  const { id } = useParams<TParams>();
  const isLoading = useAppSelector((state) => state.ingredients.ingredientsRequest);
  const ingredient = useAppSelector((state) =>
    state.ingredients.ingredients.find((ingredient) => ingredient._id === id)
  ) as TIngredientModal | undefined;

  if (isLoading)
    return (
      <div>
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
  else return <div>ингредиент не найден</div>;
};
