import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import styles from '../../pages/pages.module.css';

export default function OnlyUnauthRoute() {
  const { user, isAuthChecked } = useSelector((state) => state.user);

  console.log(user);
  if (!isAuthChecked)
    return (
      <div className={styles.loader}>
        <Preloader />
      </div>
    );
  if (user.email) return <Navigate to="/" />;
  else {
    return <Outlet />;
  }
}
