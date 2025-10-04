// import { addBun, addIngredients } from '@/services/redux/basket/slice';

import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { setIngredient } from '../../../../services/redux/details/slice';
import { useAppSelector, useAppDispatch } from '../../../../services/redux/hooks';

import type { TIngredientMain, TItem } from '../../../../types';

import styles from '../burger-ingredients-list.module.css';

type TProps = {
  ingredient: TIngredientMain;
};

export const BurgerIngredientCard = ({
  ingredient,
}: TProps): React.JSX.Element | null => {
  const dispatch = useAppDispatch();
  const selectedIngredients = useAppSelector(
    (state) => state.basket.selectedIngredients
  );
  const selectedBun = useAppSelector((state) => state.basket.selectedBun);

  const counts: Record<string, number> = {};

  selectedIngredients?.forEach((ing: TItem) => {
    const key = ing?._id;
    if (key) {
      counts[key] = (counts[key] || 0) + 1;
    }
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: ingredient.type,
    item: { ...ingredient, uid: uuidv4() },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const cardRef = useRef<HTMLDivElement | null>(null);
  dragRef(cardRef);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <section>
      <article
        data-testid="ingredient-card"
        ref={cardRef}
        onClick={() => {
          dispatch(setIngredient(ingredient));
          navigate(`/ingredients/${ingredient._id}`, {
            state: { background: location },
          });
        }}
        className={styles.burger_ingredients_card}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className={styles.burger_ingredients_img}
        />
        {selectedIngredients?.some((ing) => ing._id === ingredient._id) ||
        selectedBun?.name === ingredient.name ? (
          <Counter
            count={ingredient.type === 'bun' ? 2 : counts[ingredient._id] || 0}
            size="default"
          />
        ) : (
          ''
        )}

        <article className={styles.burger_ingredients_cardprice}>
          {ingredient.price}
          <CurrencyIcon type="primary" />
        </article>
        <p className={styles.burger_ingredients_name}>{ingredient.name}</p>
      </article>
    </section>
  );
};
