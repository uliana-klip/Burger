import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { ingredientPropType } from '../../../utils/prop-types';
import { BurgerIngredientCard } from './list-card/burger-ingredient-card';

import styles from '../burger-ingrediens-list/burger-ingredients-list.module.css';

export const BurgerIngredientsList = ({ items, title }) => {
  const selectedIngredients = useSelector((state) => state.basket.selectedIngredients);

  const counts = [];
  selectedIngredients.forEach((item) => {
    const key = item.name;
    counts[key] = (counts[key] || 0) + 1;
  });
  return (
    <div>
      <h3>{title}</h3>
      <section className={styles.burger_ingredients_type}>
        {items.map((item) => (
          <BurgerIngredientCard key={item._id} item={item} />
        ))}
      </section>
    </div>
  );
};

BurgerIngredientsList.propTypes = {
  items: PropTypes.arrayOf(ingredientPropType).isRequired,
  title: PropTypes.string.isRequired,
};
