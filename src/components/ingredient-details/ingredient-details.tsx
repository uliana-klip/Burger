import styles from './ingredient-details.module.css';

type TIngredient = {
  image: string;
  name: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
};

type TIngredientProps = {
  ingredient: TIngredient;
};

export const IngredientDetails = ({
  ingredient,
}: TIngredientProps): React.JSX.Element | null => {
  const { image, name, calories, proteins, fat, carbohydrates } = ingredient;

  return (
    <div className={styles.modal}>
      <img src={image} alt={name} className={styles.modal_img} />

      <span className={styles.modal_name}>{name}</span>
      <section className={styles.modal_info}>
        <span>
          Калории,ккал <br />
          {calories}
        </span>
        <span>
          Белки, г<br />
          {proteins}
        </span>
        <span>
          Жиры, г<br />
          {fat}
        </span>
        <span>
          Углеводы, г<br />
          {carbohydrates}
        </span>
      </section>
    </div>
  );
};
