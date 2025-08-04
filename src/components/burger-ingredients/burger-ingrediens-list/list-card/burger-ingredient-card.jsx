// import { addBun, addIngredients } from '@/services/redux/basket/slice';
import { ingredientPropType } from '@/utils/prop-types';
import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { setIngredient } from '../../../../services/redux/details/slice';

import styles from '../../burger-ingrediens-list/burger-ingredients-list.module.css';

export const BurgerIngredientCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedIngredients = useSelector((state) => state.basket.selectedIngredients);
  const selectedBun = useSelector((state) => state.basket.selectedBun);
  const counts = [];
  selectedIngredients.forEach((item) => {
    const key = item.name;
    counts[key] = (counts[key] || 0) + 1;
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: item.type,
    item: { ...item, uid: uuidv4() },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleClick = (item) => {
    dispatch(setIngredient(item));
    navigate(`/ingredients/${item._id}`, { state: { background: location } });
  };
  return (
    <section>
      <article
        ref={dragRef}
        onClick={() => handleClick(item)}
        className={styles.burger_ingredients_card}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <img
          src={item.image}
          alt={item.name}
          className={styles.burger_ingredients_img}
        />
        {selectedIngredients.some((ing) => ing._id === item._id) ||
        selectedBun?.name === item.name ? (
          <Counter count={item.type === 'bun' ? 2 : counts[item.name]} size="default" />
        ) : (
          ''
        )}

        <article className={styles.burger_ingredients_cardprice}>
          {item.price}
          <CurrencyIcon type="Primary" />
        </article>
        <p className={styles.burger_ingredients_name}>{item.name}</p>
      </article>
    </section>
  );
};

BurgerIngredientCard.propTypes = {
  item: ingredientPropType.isRequired,
};
