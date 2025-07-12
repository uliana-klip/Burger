import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import Modal from '../modal/modal';
import { ModalIngredientInfo } from '../modal/modal-ingredient-info/modal-ingredient-info';

import styles from '../burger-ingredients-list/burger-ingredients-list.module.css';

export const BurgerIngredientsList = ({ listName, arrs }) => {
  const [counts, setCounts] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const counterIngredients = (item) => {
    setCounts((prev) => ({
      ...prev,
      [item]: (prev[item] || 0) + 1,
    }));

    console.log(counts);
  };

  const modal = (
    <Modal>
      <ModalIngredientInfo onClose={() => setIsVisible(!isVisible)}>
        {modalInfo}
      </ModalIngredientInfo>
    </Modal>
  );

  return (
    <div className={styles.burger_ingredients_container}>
      <h3>{listName}</h3>
      <section className={styles.burger_ingredients_type}>
        {arrs.map((item) => (
          <article
            onMouseEnter={() => setModalInfo(item)}
            onClick={() => {
              counterIngredients(item.name);
            }}
            className={styles.burger_ingredients_card}
            key={item._id}
          >
            <img src={item.image} />
            {counts[item.name] > 0 && (
              <Counter count={counts[item.name]} size="default" />
            )}
            <article className={styles.burger_ingredients_cardprice}>
              {item.price}
              <CurrencyIcon type="Primary" />
            </article>
            <h1 onClick={() => setIsVisible(!isVisible)}>{item.name}</h1>
          </article>
        ))}
      </section>
      {isVisible && modal}
    </div>
  );
};
