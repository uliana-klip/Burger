import {
  addBun,
  addIngredients,
  clearBasket,
  removeIngredients,
  setNewOrder,
} from '@/services/redux/basket/slice';
import { clearOrder, fetchOrder } from '@/services/redux/order/slice';
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { BurgerConstructorItem } from './burger-constructor-item/burger-constructor-item';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const dispatch = useDispatch();
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
  const [{ isOver }, dropRef] = useDrop({
    accept: ['bun', 'main', 'sauce'],
    drop: (item) => {
      if (item.type === 'bun') {
        dispatch(addBun(item));
      } else {
        dispatch(addIngredients(item));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  const selectedBun = useSelector((state) => state.basket.selectedBun);
  const selectedIngredients = useSelector((state) => state.basket.selectedIngredients);
  const { orderNumber, orderRequest } = useSelector((state) => state.order);

  const handleClose = (uid) => {
    dispatch(removeIngredients(uid));
  };

  const totalPrice = useMemo(() => {
    if (!selectedBun) return 0;
    const ingredientsSum = selectedIngredients.reduce(
      (sum, item) => sum + item.price,
      0
    );
    return selectedBun.price * 2 + ingredientsSum;
  }, [selectedBun, selectedIngredients]);

  const ingredientsIds = selectedIngredients.map((ing) => ing._id);
  // console.log(`'детали заказа:' ${ingredientsIds}`);
  const moveIngredient = (fromIndex, toIndex) => {
    const updated = [...selectedIngredients];
    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);
    dispatch(setNewOrder(updated));
  };

  return !selectedBun && selectedIngredients.length === 0 ? (
    <div
      className={styles.before_order}
      ref={dropRef}
      style={{ border: isOver ? '2px dashed #3d2b93ff' : 'none' }}
    >
      <span>Пока ничего не выбрано...</span>
      <span>добавьте, пожалуйста булку и начинку</span>
      <span>(перетяните сюда)</span>
    </div>
  ) : (
    <div
      ref={dropRef}
      style={{ border: isOver ? '2px dashed #3d2b93ff' : 'none' }}
      className={styles.burger_constructor}
    >
      <section className={styles.burger_constructor_list}>
        <DragIcon className={styles.drag_hidden} />
        {!selectedBun ? (
          <span style={{ textAlign: 'center', fontSize: '20px' }}>
            кажется не хватает булки...
          </span>
        ) : (
          <ConstructorElement
            isLocked
            price={selectedBun.price}
            text={`${selectedBun.name} (верх)`}
            thumbnail={selectedBun.image}
            type="top"
          />
        )}
      </section>
      <div className={styles.burger_constructor_scroll}>
        <div style={{ minWidth: '500px' }}>
          {selectedIngredients.map((ingredient, index) => (
            <BurgerConstructorItem
              key={ingredient.uid}
              item={ingredient}
              index={index}
              handleClose={handleClose}
              moveIngredient={moveIngredient}
            />
          ))}
        </div>
      </div>

      <section className={styles.burger_constructor_list}>
        <DragIcon className={styles.drag_hidden} />
        {!selectedBun ? (
          <span style={{ textAlign: 'center', fontSize: '20px' }}>и тут...</span>
        ) : (
          <ConstructorElement
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
