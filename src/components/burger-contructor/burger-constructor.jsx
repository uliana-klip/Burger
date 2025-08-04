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
  const bunTop = 'https://code.s3.yandex.net/react/code/bun-01.png';
  const bunBottom = 'https://code.s3.yandex.net/react/code/bun-02.png';
  const sauce = 'https://code.s3.yandex.net/react/code/sp_1.png';
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
    if (!selectedBun) {
      return selectedIngredients.reduce((sum, item) => sum + item.price, 0);
    }
    const ingredientsSum = selectedIngredients.reduce(
      (sum, item) => sum + item.price,
      0
    );
    return selectedBun.price * 2 + ingredientsSum;
  }, [selectedBun, selectedIngredients]);

  const ingredientsIds = selectedIngredients.map((ing) => ing._id);

  const moveIngredient = (fromIndex, toIndex) => {
    const updated = [...selectedIngredients];
    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);
    dispatch(setNewOrder(updated));
  };

  return (
    <div
      ref={dropRef}
      style={{ border: isOver ? '2px dashed #3d2b93ff' : 'none' }}
      className={styles.burger_constructor}
    >
      <section className={styles.burger_constructor_list}>
        <DragIcon className={styles.drag_hidden} />
        {!selectedBun ? (
          <ConstructorElement
            isLocked
            price="0"
            text="добавьте, пожалуйста булку"
            thumbnail={bunTop}
            type="top"
            extraClass={styles.noselected_element}
          />
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
          {selectedIngredients.length === 0 ? (
            <section className={styles.burger_constructor_list}>
              <DragIcon className={styles.drag_hidden} />
              <ConstructorElement
                isLocked
                price="0"
                text="добавьте, пожалуйста начинку"
                thumbnail={sauce}
                extraClass={styles.noselected_element}
              />
            </section>
          ) : (
            selectedIngredients.map((ingredient, index) => (
              <BurgerConstructorItem
                key={ingredient.uid}
                item={ingredient}
                index={index}
                handleClose={handleClose}
                moveIngredient={moveIngredient}
              />
            ))
          )}
        </div>
      </div>

      <section className={styles.burger_constructor_list}>
        <DragIcon className={styles.drag_hidden} />
        {!selectedBun ? (
          <ConstructorElement
            isLocked
            price="0"
            text="добавьте, пожалуйста булку"
            thumbnail={bunBottom}
            type="bottom"
            extraClass={styles.noselected_element}
          />
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
          <span className={styles.price_text}>{totalPrice}</span>
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
