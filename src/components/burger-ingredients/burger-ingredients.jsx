import { Tab } from '@krgaa/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { ingredientPropType } from '../../utils/prop-types';
import { BurgerIngredientsList } from './burger-ingrediens-list/burger-ingredients-list';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients }) => {
  const buns = ingredients.filter((bun) => bun.type === 'bun');
  const sauces = ingredients.filter((sauce) => sauce.type === 'sauce');
  const mains = ingredients.filter((main) => main.type === 'main');
  const [isActive, setIsActive] = useState('bun');

  function selected(item) {
    if (isActive !== item) {
      setIsActive(item);
    }
  }

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab value="bun" active={isActive === 'bun'} onClick={selected}>
            Булки
          </Tab>

          <Tab value="sauce" active={isActive === 'sauce'} onClick={selected}>
            Соусы
          </Tab>

          <Tab value="main" active={isActive === 'main'} onClick={selected}>
            Начинки
          </Tab>
        </ul>
      </nav>
      <div className={styles.burger_ingredients_container}>
        <div>
          <BurgerIngredientsList
            ingredients={ingredients}
            listName={'Булки'}
            arrs={buns}
          />
          <BurgerIngredientsList
            ingredients={ingredients}
            listName={'Соусы'}
            arrs={sauces}
          />
          <BurgerIngredientsList
            ingredients={ingredients}
            listName={'Начинки'}
            arrs={mains}
          />
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};
