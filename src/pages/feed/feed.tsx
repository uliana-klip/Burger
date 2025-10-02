import { OrderCard } from '@/components/order-card/order-card';
import { useAppDispatch, useAppSelector } from '@/services/redux/hooks';
import { wsFeedConnect, wsFeedDisconnect } from '@/services/redux/web-socket/feed-slice';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './feed.module.css';

export const Feed = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { orders, total, totalToday } = useAppSelector((state) => state.feed);

  useEffect(() => {
    dispatch(wsFeedConnect());
    return (): void => {
      dispatch(wsFeedDisconnect());
    };
  }, [dispatch]);

  const ordersDone = orders.filter((order) => order.status === 'done');

  const ordersPending = orders.filter((order) => order.status === 'pending');

  if (orders.length <= 0) return <Preloader />;

  return (
    <div className={styles.feed}>
      <h1>Лента заказов</h1>
      <div className={styles.feed_container}>
        <div className={styles.feed_left}>
          {orders.map((order) => (
            <Link
              to={`/feed/${order.number}`}
              state={{ background: location }}
              className={styles.link}
              key={order._id}
            >
              <OrderCard {...order} showStatus={false} />
            </Link>
          ))}
        </div>
        <div className={styles.feed_right}>
          <section className={styles.statuses}>
            <section className={styles.status_done}>
              <h4>Готовы:</h4>

              <section className={styles.statuses_column}>
                {ordersDone.map((order) => (
                  <span className={styles.status_done_numbers} key={order._id}>
                    {order.number}
                  </span>
                ))}
              </section>
            </section>

            <section className={styles.status_pending}>
              <h4>В работе:</h4>

              <section className={styles.statuses_column}>
                {ordersPending.map((order) => (
                  <span className={styles.status_pending_text} key={order._id}>
                    {order.number}
                  </span>
                ))}
              </section>
            </section>
          </section>
          <section>
            <h4>Выполнено за все время:</h4>
            <span className={styles.orders_done}>{total}</span>
          </section>
          <section>
            <h4>Выполнено за сегодня:</h4>
            <span className={styles.orders_done}>{totalToday}</span>
          </section>
        </div>
      </div>
    </div>
  );
};
