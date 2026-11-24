import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const RutaProtegida = ({ children, rolesPermitidos }) => {
  const { user, loading } = useAuth();

  // Mientras se verifica el estado de autenticación, mostramos un mensaje de carga.
  // Esto evita redirigir al login prematuramente en una recarga de página.
  if (loading) return <div>Cargando...</div>;

  // Sin sesión iniciada: al login
  if (!user) return <Navigate to="/login" replace />;

  // Con sesión pero sin el rol necesario: al inicio (no al login)
  if (rolesPermitidos && !rolesPermitidos.includes(user.rol))
    return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default RutaProtegida;
