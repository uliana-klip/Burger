import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { Login } from '@/pages/login/login';
import { OrderHandler } from '@/pages/order-hadler/order-handler';
import { Profile } from '@/pages/profile/profile';
import { Register } from '@/pages/register/register';
import { fetchIngredients } from '@/services/redux/ingredients/slice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter /*Routes*/ } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';

import styles from './app.module.css';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <AppHeader />
        {/* <Routes> */}
        <Login />
        <Register />
        <Profile />
        <ForgotPassword />
        <OrderHandler />

        {/* </Routes> */}
      </div>
    </BrowserRouter>
  );
};
