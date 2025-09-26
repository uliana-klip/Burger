import { useAppSelector } from '@/services/redux/hooks';
import {
  CurrencyIcon,
  FormattedDate,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';

import type { TOrderCardProps } from '@/types';

import styles from './order-card.module.css';

export const OrderCard = ({
  _id,
  number,
  createdAt,
  status,
  ingredients,
  name,
  showStatus,
}: TOrderCardProps): React.JSX.Element | null => {
  const allIngredients = useAppSelector((state) => state.ingredients.ingredients);

  if (allIngredients.length === 0) return <Preloader />;

  const orderIngredients = ingredients
    .map((id) => allIngredients.find((item) => item._id === id))
    .filter(Boolean);

  const gallery = [...new Set(orderIngredients)]; //если я правильно поняла что дублей фото быть не далжно

  const price = orderIngredients.reduce((acc, item) => acc + item!.price, 0);

  const cardStatus: Record<string, string> = {
    pending: 'Готовится',
    done: 'Выполнен',
    created: 'Создан',
  };

  const maxVisible = 5;

  return (
    <div className={styles.card_order_container}>
      <section className={styles.card_order_header}>
        <span className={styles.order_number}>{number}</span>
        <span className={styles.order_date}>
          <FormattedDate date={new Date(createdAt)} />
        </span>
      </section>
      <span className={styles.card_order_name}>{name}</span>
      {showStatus && status ? <span>{cardStatus[status]}</span> : ''}

      <div className={styles.card_order_footer}>
        <section className={styles.galery_order}>
          {gallery.slice(0, maxVisible).map((ing, index) => (
            <img key={index} src={ing?.image} alt={ing?.name} />
          ))}
          {gallery.length > maxVisible && (
            <div className={styles.with_counter}>
              <img src={gallery[maxVisible]?.image} alt={gallery[maxVisible]?.name} />
              <span className={styles.overlay}>{gallery.length - maxVisible}</span>
            </div>
          )}
        </section>

        <section className={styles.card_order_price}>
          <span>{price}</span>
          <CurrencyIcon type="primary" />
        </section>
      </div>
    </div>
  );
};
