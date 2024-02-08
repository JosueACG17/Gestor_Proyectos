import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
    canActivate,
    redirectPath = '/'
}) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!canActivate || user.nombre_del_rol !== 'Administrador') {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;