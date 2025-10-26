// TODO: utiliza este componente para proteger la ruta / de tal modo que los usuarios no autorizados no puedan acceder a ella.
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn }) => {
  return (
    <>
      {isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />}
    </>
  );
};

export default ProtectedRoute;
