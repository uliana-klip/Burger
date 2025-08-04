import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { Home } from '@/pages/home/home';
import { IngredientPage } from '@/pages/ingredient/ingredient-page';
import { Login } from '@/pages/login/login';
import { Profile } from '@/pages/profile/profile';
import { Register } from '@/pages/register/register';
import { ResetPassword } from '@/pages/reset-password/reset-password';
import { fetchIngredients } from '@/services/redux/ingredients/slice';
import { setUser } from '@/services/redux/user/slice';
import { userRequest } from '@/utils/api';
import { getCookie } from '@/utils/cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';

import styles from './app.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  //const { user, isAuthChecked } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchIngredients());
    const initUser = async () => {
      const token = getCookie('token');
      if (token) {
        const res = await userRequest();
        dispatch(setUser(res.user));
      }
    };
    initUser(dispatch);
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
      </Routes>
    </div>
  );
};
