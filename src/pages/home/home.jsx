import { BurgerConstructor } from '@/components/burger-contructor/burger-constructor';
import { BurgerIngredients } from '@/components/burger-ingredients/burger-ingredients';
import { IngredientDetails } from '@/components/ingredient-details/ingredient-details';
import Modal from '@/components/modal/modal';
import { clearIngredient } from '@/services/redux/details/slice';
import { useDispatch, useSelector } from 'react-redux';

import styles from '@/components/app/app.module.css';

export const Home = () => {
  const dispatch = useDispatch();
  const { currentIngredient } = useSelector((state) => state.details);

  const modal = (
    <Modal title="Детали ингредиента" onClose={() => dispatch(clearIngredient())}>
      <IngredientDetails ingredient={currentIngredient} />
    </Modal>
  );

  return (
    <div className={styles.app}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
      {currentIngredient && modal}
    </div>
  );
};
