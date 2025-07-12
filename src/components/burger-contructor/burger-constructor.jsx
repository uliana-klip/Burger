import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { ingredientPropType } from '../../utils/prop-types';
import Modal from '../modal/modal';
import { ModalOrderDetails } from '../modal/modal-order-details/modal-order-details';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ ingredients }) => {
  const [isVisible, setIsVisible] = useState(false);

  if (!ingredients || !ingredients.length) {
    return <p>Загружаем ингредиенты...</p>;
  }

  const mains = ingredients.filter((main) => main.type === 'main').slice(0, 5);
  const buns = ingredients.filter((bun) => bun.type === 'bun');

  const modal = (
    <Modal onClose={() => setIsVisible(false)}>
      <ModalOrderDetails onClose={() => setIsVisible(false)} />
    </Modal>
  );

  const totalPrice =
    buns.length > 0
      ? buns[0].price * 2 + mains.reduce((sum, item) => sum + item.price, 0)
      : 0;
  return (
    <div className={styles.burger_constructor}>
      <section className={styles.burger_constructor_list}>
        <div />
        <ConstructorElement
          // handleClose={function fee() {}}
          isLocked
          price={buns[0].price}
          text={buns[0].name}
          thumbnail="https://react-burger-ui-components.practicum.com.ru/assets/img-CFqVEZmj.png"
          type="top"
        />

        {mains.map((main) => (
          <React.Fragment key={main._id}>
            <DragIcon />
            <ConstructorElement
              // handleClose={function fee() {}}
              price={main.price}
              text={main.name}
              thumbnail={main.image}
            />
          </React.Fragment>
        ))}
        <div />
        <ConstructorElement
          // handleClose={function fee() {}}
          isLocked
          price={buns[0].price}
          text={buns[0].name}
          thumbnail="https://react-burger-ui-components.practicum.com.ru/assets/img-CFqVEZmj.png"
          type="bottom"
        />
        <div />
        <section className={styles.burger_constructor_order}>
          <article className={styles.total_price}>
            <p className={styles.price_text}>{totalPrice}</p>
            <div className={styles.currency_icon_large}>
              <CurrencyIcon />
            </div>
          </article>
          <Button onClick={() => setIsVisible(!isVisible)} size="large" type="primary">
            Оформить заказ
          </Button>
        </section>
      </section>

      {isVisible && modal}
    </div>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};
