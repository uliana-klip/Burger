import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import styles from './burger-ingredients-list.module.css';

export const BurgerIngredientsList = ({ listName, arrs }) => {
  const [counts, setCounts] = useState({});

  const counterIngredients = (name) => {
    setCounts((prev) => ({
      ...prev,
      [name]: (prev[name] || 0) + 1,
    }));
    console.log(counts);
  };

  return (
    <>
      <h3>{listName}</h3>
      <section className={styles.burger_ingredients_type}>
        {arrs.map((item) => (
          <article
            onClick={() => counterIngredients(item.name)}
            className={styles.burger_ingredients_card}
            key={item._id}
          >
            {counts[item.name] > 0 && (
              <Counter count={counts[item.name]} size="default" />
            )}

            <img src={item.image} />
            <article className={styles.burger_ingredients_cardprice}>
              {item.price}
              <CurrencyIcon type="Primary" />
            </article>
            <h1>{item.name}</h1>
          </article>
        ))}
      </section>
    </>
  );
};
