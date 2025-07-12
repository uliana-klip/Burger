import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { ingredientPropType } from '../../utils/prop-types';
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
      [item._id]: (prev[item._id] || 0) + 1,
    }));

    console.log(counts);
  };

  const modal = (
    <Modal onClose={() => setIsVisible(false)}>
      <ModalIngredientInfo ingredient={modalInfo} onClose={() => setIsVisible(false)} />
    </Modal>
  );

  return (
    <div className={styles.burger_ingredients_container}>
      <h3>{listName}</h3>
      <section className={styles.burger_ingredients_type}>
        {arrs.map((item) => (
          <article
            onClick={() => {
              counterIngredients(item);
              setIsVisible(!isVisible);
              setModalInfo(item);
            }}
            onMouseEnter={() => setModalInfo(item)}
            className={styles.burger_ingredients_card}
            key={item._id}
          >
            <img src={item.image} />
            {counts[item._id] > 0 && (
              <Counter count={item.type === 'bun' ? 2 : 1} size="default" />
            )}
            <article className={styles.burger_ingredients_cardprice}>
              {item.price}
              <CurrencyIcon type="Primary" />
            </article>
            <h1>{item.name}</h1>
          </article>
        ))}
      </section>
      {isVisible && modal}
    </div>
  );
};

BurgerIngredientsList.propTypes = {
  listName: PropTypes.string.isRequired,
  arrs: PropTypes.arrayOf(ingredientPropType).isRequired,
};
