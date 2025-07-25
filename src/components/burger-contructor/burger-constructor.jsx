import { clearBasket, removeIngredients } from '@/services/redux/basket/slice';
import { clearOrder, fetchOrder } from '@/services/redux/order/slice';
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
// import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { ingredientPropType } from '../../utils/prop-types';
import Modal from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const selectedBun = useSelector((state) => state.basket.selectedBun);
  const selectedIngredients = useSelector((state) => state.basket.selectedIngredients);
  const { orderNumber, orderRequest } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const handleClose = (uid) => {
    dispatch(removeIngredients(uid));
  };

  // const [isVisible, setIsVisible] = useState(false);
  // console.log(selectedIngredients);

  const totalPrice = useMemo(() => {
    if (!selectedBun) return 0;
    const ingredientsSum = selectedIngredients.reduce(
      (sum, item) => sum + item.price,
      0
    );
    return selectedBun.price * 2 + ingredientsSum;
  }, [selectedBun, selectedIngredients]);

  const ingredientsIds = selectedIngredients.map((ing) => ing._id);
  console.log(`'детали заказа:' ${ingredientsIds}`);
  if (!selectedBun && selectedIngredients.length === 0) {
    return (
      <div className={styles.before_order}>
        <span>Пока ничего не выбрано...</span>
        <span>добавьте, пожалуйста булку и начинку</span>
        <span>(перетяните сюда)</span>
      </div>
    );
  }

  const modal = (
    <Modal
      onClose={() => {
        dispatch(clearOrder());
        dispatch(clearBasket());
      }}
    >
      <OrderDetails />
    </Modal>
  );

  return (
    <div className={styles.burger_constructor}>
      <section className={styles.burger_constructor_list}>
        <DragIcon className={styles.drag_hidden} />
        {!selectedBun ? (
          <span style={{ textAlign: 'center', fontSize: '20px' }}>
            кажется не хватает булки...
          </span>
        ) : (
          <ConstructorElement
            // handleClose={function fee() {}}
            isLocked
            price={selectedBun.price}
            text={`${selectedBun.name} (верх)`}
            thumbnail={selectedBun.image}
            type="top"
          />
        )}
      </section>
      <div className={styles.burger_constructor_scroll}>
        <section className={styles.burger_constructor_list}>
          {selectedIngredients.map((ingredient) => (
            <React.Fragment key={ingredient.uid}>
              <DragIcon />

              <ConstructorElement
                handleClose={() => handleClose(ingredient.uid)}
                price={ingredient.price}
                text={ingredient.name}
                thumbnail={ingredient.image}
              />
            </React.Fragment>
          ))}
        </section>
      </div>

      <section className={styles.burger_constructor_list}>
        <DragIcon className={styles.drag_hidden} />
        {!selectedBun ? (
          <span style={{ textAlign: 'center', fontSize: '20px' }}>и тут...</span>
        ) : (
          <ConstructorElement
            // handleClose={function fee() {}}
            isLocked
            price={selectedBun.price}
            text={`${selectedBun.name} (низ)`}
            thumbnail={selectedBun.image}
            type="bottom"
          />
        )}
      </section>
      <div />
      <section className={styles.burger_constructor_order}>
        <article className={styles.total_price}>
          <p className={styles.price_text}>{totalPrice}</p>
          <div className={styles.currency_icon_large}>
            <CurrencyIcon />
          </div>
        </article>
        <Button
          disabled={orderRequest || !selectedBun || selectedIngredients.length === 0}
          onClick={() => {
            dispatch(fetchOrder(ingredientsIds));
          }}
          size="large"
          type="primary"
        >
          {orderRequest ? 'Отправляем...' : 'Оформить заказ'}
        </Button>
      </section>

      {orderNumber && modal}
    </div>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};
