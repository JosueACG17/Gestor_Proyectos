import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
    canActivate,
    redirectPath = '/'
}) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!canActivate) {
        // Usuario no autenticado, redirigir al inicio de sesión
        return <Navigate to={redirectPath} replace />;
    } else if (user && user.nombre_del_rol !== 'Administrador' ) {
        // Usuario autenticado pero no es Administrador, redirigir al inicio de sesión
        return <Navigate to={redirectPath} replace />;
    }
    // Permitir el acceso a la ruta protegida para usuarios autenticados y Administradores
    return <Outlet />;
}

export default ProtectedRoute;