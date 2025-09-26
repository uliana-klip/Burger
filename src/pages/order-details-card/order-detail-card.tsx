import { useAppSelector } from '@/services/redux/hooks';
import request from '@/utils/request';
import {
  CurrencyIcon,
  FormattedDate,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import type { TOrder } from '@/types';

import styles from './order-details-card.module.css';

export const OrderDetailsCard = (): React.JSX.Element => {
  const { number } = useParams<{ number: string }>();
  const feedOrders = useAppSelector((state) => state.feed.orders);
  const profileOrders = useAppSelector((state) => state.profileOrders.orders);
  const allOrders = [...feedOrders, ...profileOrders];
  const order = allOrders.find((order) => order.number === Number(number));

  const allIngredients = useAppSelector((state) => state.ingredients.ingredients);

  const cardStatus: Record<string, string> = {
    pending: 'Готовится',
    done: 'Выполнен',
    created: 'Создан',
  };

  const [fetchedOrder, setFetchedOrder] = useState<TOrder | null>(null);
  const [loading, setLoading] = useState(false);

  const currentOrder = order || fetchedOrder;

  const ingredientsById = allIngredients.reduce(
    (acc, item) => {
      acc[item._id] = item;
      return acc;
    },
    {} as Record<string, (typeof allIngredients)[number]>
  );

  const counts: Record<string, number> = {};
  currentOrder?.ingredients.forEach((id) => {
    counts[id] = (counts[id] || 0) + 1;
  });

  const orderItems = Object.keys(counts).map((id) => ({
    ...ingredientsById[id],
    qty: counts[id],
  }));

  const totalPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const date = currentOrder ? new Date(currentOrder?.createdAt) : null;
  useEffect(() => {
    if (!order && number) {
      const fetchOrder = async (): Promise<void> => {
        try {
          setLoading(true);
          const data = await request<{ orders: TOrder[] }>(`/orders/${number}`);
          if (data.orders.length > 0) {
            setFetchedOrder(data.orders[0]);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    }
  }, [order, number]);

  if (allIngredients.length === 0) {
    return <Preloader />;
  } else if (!loading && !currentOrder) {
    return <div>Заказ не найден</div>;
  } else if (currentOrder)
    return (
      <div className={styles.card_container}>
        <span className={styles.card_number}>{currentOrder.number}</span>
        <span className={styles.card_name}> {currentOrder.name}</span>
        <span
          className={
            currentOrder.status === 'done' ? styles.card_status_done : styles.card_status
          }
        >
          {cardStatus[currentOrder.status as keyof typeof cardStatus] || ''}
        </span>
        <p>Состав:</p>
        <div className={styles.card_scroll}>
          {orderItems.map((item) => (
            <section key={item._id} className={styles.card_main}>
              <section className={styles.card_main_row}>
                <section className={styles.card_main_item}>
                  <img src={item?.image} alt={item?.name} />
                  <span className={styles.card_main_iname}>{item?.name}</span>
                </section>
                <section className={styles.card_main_price}>
                  <article>{item.qty}</article>
                  <article>x</article>
                  <article>{item?.price}</article>
                  <article>
                    <CurrencyIcon type="primary" />
                  </article>
                </section>
              </section>
            </section>
          ))}
        </div>

        <section className={styles.card_footer}>
          <span className={styles.card_date}>
            {date && <FormattedDate date={date} />}
          </span>
          <section className={styles.card_main_price}>
            <span>{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </section>
        </section>
      </div>
    );
  else return <Preloader />;
};
