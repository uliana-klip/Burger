import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

// import { ingredients } from '@utils/ingredients';
import styles from './app.module.css';

export const App = () => {
  const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((json) => setIngredients(json.data))
      .catch((err) => console.error('Ошибка загрузки ингредиентов:', err));
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </div>
  );
};
