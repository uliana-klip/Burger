import { OrderCard } from '@/components/order-card/order-card';
import { useAppDispatch, useAppSelector } from '@/services/redux/hooks';
import {
  wsProfileConnect,
  wsProfileDisconnect,
  wsProfileError,
} from '@/services/redux/web-socket/profile-slice';
import { requestWithRefresh } from '@/utils/request-with-refresh';
import { Button, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './orders.module.css';

export const Orders = (): React.JSX.Element => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const connected = useAppSelector((state) => state.profileOrders.connected);
  const isLoaded = useAppSelector((state) => state.profileOrders.isLoaded);

  const orders = useAppSelector((state) => state.profileOrders?.orders) ?? [];
  const _orders = [...orders].reverse();

  useEffect(() => {
    const init = async (): Promise<void> => {
      try {
        await requestWithRefresh('/auth/user');
        dispatch(wsProfileConnect());
      } catch (_e) {
        dispatch(wsProfileError('auth refresh error'));
      }
    };
    void init();
    return (): void => {
      dispatch(wsProfileDisconnect());
    };
  }, [dispatch]);

  if (!connected) {
    return (
      <div className={styles.not_orders}>
        <Preloader />
      </div>
    );
  } else if (connected && !isLoaded && orders.length === 0) {
    return (
      <div className={styles.not_orders}>
        <Preloader />
      </div>
    );
  } else if (connected && isLoaded && orders.length === 0) {
    return (
      <div className={styles.not_orders}>
        <span>Вы еще не сделали ни одного заказа</span>
        <Link to={'/'}>
          <Button extraClass={styles.not_orders_button} htmlType="button">
            сделать первый заказ
          </Button>
        </Link>
      </div>
    );
  } else
    return (
      <div className={styles.orders_container}>
        {_orders.map((order) => (
          <Link
            to={`/profile/orders/${order.number}`}
            state={{ background: location }}
            className={styles.link}
            key={order._id}
          >
            <OrderCard {...order} showStatus />
          </Link>
        ))}
      </div>
    );
};
