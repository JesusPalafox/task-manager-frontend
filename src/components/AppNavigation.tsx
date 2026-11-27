import { NavLink } from 'react-router';
export function AppNavigation() {
  return <nav className="app-navigation" aria-label="Navegación principal">
    <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
      Inicio
    </NavLink>
    <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active' : ''}>
      Mis tareas
    </NavLink>
  </nav>;
}
