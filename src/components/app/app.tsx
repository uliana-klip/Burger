import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { Home } from '@/pages/home/home';
import { IngredientPage } from '@/pages/ingredient/ingredient-page';
import { Login } from '@/pages/login/login';
import { Page404 } from '@/pages/not-found-404/not-found-404';
import { OrdersHistory } from '@/pages/profile/orders-history';
import { Profile } from '@/pages/profile/profile';
import { ProfileForm } from '@/pages/profile/profile-form';
import { Register } from '@/pages/register/register';
import { ResetPassword } from '@/pages/reset-password/reset-password';
import { clearIngredient } from '@/services/redux/details/slice';
import { useAppDispatch, useAppSelector } from '@/services/redux/hooks';
import { fetchIngredients } from '@/services/redux/ingredients/slice';
import { setAuthChecked, setUser } from '@/services/redux/user/slice';
import { getUserRequest } from '@/utils/api';
import { getCookie } from '@/utils/cookie';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Modal from '../modal/modal';
import ProtectedRoute from '../routes/protected-route';
import { AppHeader } from '@components/app-header/app-header';

import styles from './app.module.css';

export const App = (): React.JSX.Element | null => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location.state?.background;

  const { isAuthChecked } = useAppSelector((state) => state.user);

  useEffect((): void => {
    const fetchUser = async (): Promise<void> => {
      try {
        const res = await getUserRequest();
        dispatch(setUser(res.user));
        dispatch(setAuthChecked());
      } catch (error) {
        dispatch(setAuthChecked());
        console.error(error);
      }
    };

    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      dispatch(setAuthChecked());
    } else {
      fetchUser();
    }
  }, [dispatch]);

  useEffect((): void => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      {!isAuthChecked ? (
        <Preloader />
      ) : (
        <Routes location={background || location}>
          <Route path="/" element={<Home />} />
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />}>
              <Route index element={<ProfileForm />} />
              <Route path="orders-history" element={<OrdersHistory />} />
            </Route>

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/*" element={<Page404 />} />
        </Routes>
      )}
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                onClose={(): void => {
                  dispatch(clearIngredient());
                }}
              >
                <IngredientPage />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};
