import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../context/useAuth';
export function AppNavigation() {
 const {user,status,signOut}=useAuth();const navigate=useNavigate();
 return <nav className="app-navigation" aria-label="Navegación principal">
   <NavLink to="/" end className={({isActive})=>isActive?'active':''}>Inicio</NavLink>
   {status === 'authenticated' ? <>
     <NavLink to="/tasks" className={({isActive})=>isActive?'active':''}>Mis tareas</NavLink>
     <span className="navigation-user">{user?.name} · {user?.role}</span>
     <button className="secondary-button" onClick={()=>{signOut();navigate('/login',{replace:true});}}>Cerrar sesión</button>
   </> : <>
     <NavLink to="/login" className={({isActive})=>isActive?'active':''}>Ingresar</NavLink>
     <NavLink to="/register" className={({isActive})=>isActive?'active':''}>Registrarme</NavLink>
   </>}
 </nav>;
}
