import { clearIngredient } from '@/services/redux/details/slice';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { ingredientPropType } from '../../../utils/prop-types';
import { IngredientDetails } from '../../ingredient-details/ingredient-details';
import Modal from '../../modal/modal';
import { BurgerIngredientCard } from './list-card/burger-ingredient-card';

import styles from '../burger-ingrediens-list/burger-ingredients-list.module.css';

export const BurgerIngredientsList = ({ items, title }) => {
  const dispatch = useDispatch();

  const selectedIngredients = useSelector((state) => state.basket.selectedIngredients);

  const currentIngredient = useSelector((state) => state.details.currentIngredient);

  const modal = (
    <Modal title="Детали ингредиента" onClose={() => dispatch(clearIngredient())}>
      <IngredientDetails ingredient={currentIngredient} />
    </Modal>
  );
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

      {currentIngredient && modal}
    </div>
  );
};

BurgerIngredientsList.propTypes = {
  items: PropTypes.arrayOf(ingredientPropType).isRequired,
  title: PropTypes.string.isRequired,
};
