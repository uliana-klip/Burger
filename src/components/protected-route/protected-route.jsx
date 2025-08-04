import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute() {
  const { user, isAuthChecked } = useSelector((state) => state.user);
  const location = useLocation();

  if (isAuthChecked === false)
    return (
      <div>
        <Preloader />
      </div>
    );
  else if (!user && user.email === '') {
    return <Navigate to="/login" state={{ from: location }} />;
  } else {
    return <Outlet />;
  }
}
