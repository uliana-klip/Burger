import { Tab } from '@krgaa/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import { ingredientPropType } from '../../utils/prop-types';
import { BurgerIngredientsList } from './burger-ingrediens-list/burger-ingredients-list';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients }) => {
  const buns = ingredients.filter((bun) => bun.type === 'bun');
  const sauces = ingredients.filter((sauce) => sauce.type === 'sauce');
  const mains = ingredients.filter((main) => main.type === 'main');
  const [isActive, setIsActive] = useState('bun');

  function selected(tab) {
    setIsActive(tab);
    if (tab === 'bun') {
      bunRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'sauce') {
      sauceRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      mainRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }
  const containerRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const containerTop = container.getBoundingClientRect().top;

      const bunTop = bunRef.current.getBoundingClientRect().top;
      const sauceTop = sauceRef.current.getBoundingClientRect().top;
      const mainTop = mainRef.current.getBoundingClientRect().top;

      const bunOffset = Math.abs(bunTop - containerTop);
      const sauceOffset = Math.abs(sauceTop - containerTop);
      const mainOffset = Math.abs(mainTop - containerTop);
      console.log('Offsets:', { bunOffset, sauceOffset, mainOffset });
      console.log('Active tab:', isActive);
      if (bunOffset < sauceOffset && bunOffset < mainOffset) {
        setIsActive('bun');
      } else if (sauceOffset < mainOffset) {
        setIsActive('sauce');
      } else {
        setIsActive('main');
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);
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
      <div className={styles.burger_ingredients_container} ref={containerRef}>
        <div>
          <div ref={bunRef}>
            <BurgerIngredientsList
              ingredients={ingredients}
              listName={'Булки'}
              arrs={buns}
            />
          </div>
          <div ref={sauceRef}>
            <BurgerIngredientsList
              ingredients={ingredients}
              listName={'Соусы'}
              arrs={sauces}
            />
          </div>
          <div ref={mainRef}>
            <BurgerIngredientsList
              ingredients={ingredients}
              listName={'Начинки'}
              arrs={mains}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};
