import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../service/authService';

const PrivateRoute = ({ roles }) => {
    const isAuth = isAuthenticated();
    const userRole = getUserRole();

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    if (roles && !roles.includes(userRole)) {
        // Not authorized for this role
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
