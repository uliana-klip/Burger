import { useAppSelector } from '@/services/redux/hooks';

import { BurgerIngredientCard } from './list-card/burger-ingredient-card';

import type { TItem } from '@/types';

import styles from './burger-ingredients-list.module.css';

type TProps = {
  items: TItem[];
  title: string;
};

export const BurgerIngredientsList = ({
  items,
  title,
}: TProps): React.JSX.Element | null => {
  const selectedIngredients = useAppSelector(
    (state) => state.basket.selectedIngredients
  );

  const counts: Record<string, number> = {};
  if (!selectedIngredients) return null;
  selectedIngredients.forEach((item: TItem) => {
    const key = item?.name;
    if (key) {
      counts[key] = (counts[key] || 0) + 1;
    }
  });
  return (
    <div>
      <h3>{title}</h3>
      <section className={styles.burger_ingredients_type}>
        {items.map((item) => (
          <BurgerIngredientCard key={item._id} ingredient={item} />
        ))}
      </section>
    </div>
  );
};
