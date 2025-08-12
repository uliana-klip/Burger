import { logoutUser, setAuthChecked } from '@/services/redux/user/slice';
import { deleteCookie } from '@/utils/cookie';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import styles from './profile.module.css';

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(setAuthChecked(false));
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
    navigate('/login');
  };

  return (
    <div className={styles.profile}>
      <section className={styles.profile_left}>
        <nav className={styles.profile_left_navigation}>
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : ''}`
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to="orders-history"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : ''}`
            }
          >
            История заказов
          </NavLink>
          <button className={styles.link} onClick={handleLogout}>
            Выход
          </button>
        </nav>
        <p>
          В этом разделе вы можете
          <br />
          изменить свои персональные данные
        </p>
      </section>
      <section className={styles.profile_right}>
        <Outlet />
      </section>
    </div>
  );
};
