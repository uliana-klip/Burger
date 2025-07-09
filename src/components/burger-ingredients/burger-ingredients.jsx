import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { BurgerIngredientsList } from '../burger-ingredients-list/burger-ingredients-list';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients }) => {
  const buns = ingredients.filter((bun) => bun.type === 'bun');
  const sauсes = ingredients.filter((sauce) => sauce.type === 'sauce');
  const mains = ingredients.filter((main) => main.type === 'main');

  const [isActive, setIsActive] = useState('bun');

  const selected = (item) => {
    console.log(item);
    if (isActive !== item) {
      setIsActive(item);
    }
  };

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={isActive === 'bun'}
            onClick={selected}
            // onClick={() => {
            //   /* TODO */
            // }}
          >
            Булки
          </Tab>

          <Tab value="sauce" active={isActive === 'sauce'} onClick={selected}>
            Соусы
          </Tab>

          <Tab
            value="main"
            active={isActive === 'main'}
            onClick={selected}
            // onClick={() => {
            //   /* TODO */
            // }}
          >
            Начинки
          </Tab>
        </ul>
      </nav>
      <div className={styles.burger_ingredients_container}>
        <div>
          {/* {isActive === 'bun' && (
            <BurgerIngredientsList listName={'Булки'} arrs={buns} />
          )}
          {isActive === 'sauce' && (
            <BurgerIngredientsList listName={'Соусы'} arrs={sauсes} />
          )}
          {isActive === 'main' && (
            <BurgerIngredientsList listName={'Начинки'} arrs={mains} />
          )} */}
          <BurgerIngredientsList listName={'Булки'} arrs={buns} />
          <BurgerIngredientsList listName={'Соусы'} arrs={sauсes} />
          <BurgerIngredientsList listName={'Начинки'} arrs={mains} />
        </div>
        <article className={styles.scroll}></article>
      </div>
    </section>
  );
};
