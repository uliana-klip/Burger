import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { BurgerIngredientsList } from './burger-ingrediens-list/burger-ingredients-list';

import type { TItem, TRootState } from '@/types';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): React.JSX.Element | null => {
  const ingredients = useSelector<TRootState, TItem[]>(
    (state) => state.ingredients.ingredients
  );
  const buns = ingredients.filter((ing) => ing.type === 'bun');
  const sauce = ingredients.filter((ing) => ing.type === 'sauce');
  const main = ingredients.filter((ing) => ing.type === 'main');
  const [isActive, setIsActive] = useState('bun');

  const selected = (tab: string): void => {
    setIsActive(tab);
    if (tab === 'bun') {
      bunRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'sauce') {
      sauceRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      mainRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bunRef = useRef<HTMLDivElement | null>(null);
  const sauceRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = (): void => {
      const containerTop = container.getBoundingClientRect().top;

      const bunTop = bunRef.current?.getBoundingClientRect().top;
      const sauceTop = sauceRef.current?.getBoundingClientRect().top;
      const mainTop = mainRef.current?.getBoundingClientRect().top;

      if (!bunTop || !sauceTop || !mainTop) return;
      const bunOffset = Math.abs(bunTop - containerTop);
      const sauceOffset = Math.abs(sauceTop - containerTop);
      const mainOffset = Math.abs(mainTop - containerTop);

      if (bunOffset < sauceOffset && bunOffset < mainOffset) {
        setIsActive('bun');
      } else if (sauceOffset < mainOffset) {
        setIsActive('sauce');
      } else {
        setIsActive('main');
      }
    };

    container.addEventListener('scroll', handleScroll);
    return (): void => container.removeEventListener('scroll', handleScroll);
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
            <BurgerIngredientsList items={buns} title="Булки" />
          </div>
          <div ref={sauceRef}>
            <BurgerIngredientsList items={sauce} title="Соусы" />
          </div>
          <div ref={mainRef}>
            <BurgerIngredientsList items={main} title="Начинки" />
          </div>
        </div>
      </div>
    </section>
  );
};
