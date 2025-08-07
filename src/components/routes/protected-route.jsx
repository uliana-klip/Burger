import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute() {
  const { user, isAuthChecked } = useSelector((state) => state.user);
  const location = useLocation();
  const pathname = location.pathname;

  const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];

  const protectedRoutes = ['/profile', '/profile/orders'];

  if (!isAuthChecked) {
    return (
      <div>
        <Preloader />
      </div>
    );
  }

  const isPublic = publicRoutes.includes(pathname);
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (user && isPublic) {
    return <Navigate to="/" replace />;
  }

  if (!user && isProtected) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
