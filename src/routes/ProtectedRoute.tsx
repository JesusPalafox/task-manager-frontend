import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../context/useAuth';
export function ProtectedRoute() {
 const { status, error, retry, signOut } = useAuth();
 const location = useLocation();
 if (status === 'checking') return <section className="panel auth-panel" role="status">Validando sesión…</section>;
 if (status === 'error') return <section className="panel auth-panel" role="alert">
   <h2>No se pudo validar tu sesión</h2><p>{error}</p>
   <button onClick={retry}>Reintentar</button>{' '}
   <button onClick={signOut} className="secondary-button">Cerrar sesión</button>
 </section>;
 if (status === 'anonymous') return <Navigate to="/login" replace
   state={{ from: location.pathname + location.search }} />;
 return <Outlet />;
}
