import {
  ConstructorElement,
  DragIcon,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import React from 'react';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ ingredients }) => {
  if (!ingredients || !ingredients.length) {
    return <p>Загружаем ингредиенты...</p>;
  }
  const mains = ingredients.filter((main) => main.type === 'main').slice(0, 5);
  const buns = ingredients.filter((bun) => bun.type === 'bun');

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
        <Button /*onClick={function fee() {}}*/ size="large" type="primary">
          Оформить заказ
        </Button>
      </section>
    </div>
  );
};
