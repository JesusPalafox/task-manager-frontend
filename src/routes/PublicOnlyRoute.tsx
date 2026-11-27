import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/useAuth';
export function PublicOnlyRoute() {
 const { status } = useAuth();
 if (status === 'checking') return <section className="panel auth-panel">Recuperando sesión…</section>;
 if (status === 'authenticated') return <Navigate replace to="/tasks" />;
 return <Outlet />;
}
