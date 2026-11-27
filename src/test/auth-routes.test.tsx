import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAuth } from '../context/useAuth';
import type { AuthContextValue } from '../context/auth-context';
import { ProtectedRoute } from '../routes/ProtectedRoute';
import { PublicOnlyRoute } from '../routes/PublicOnlyRoute';
vi.mock('../context/useAuth', () => ({ useAuth: vi.fn() }));
const mockedUseAuth = vi.mocked(useAuth);
const defaultAuth: AuthContextValue = {
 status:'anonymous', user:null, token:null, error:'',
 signIn:vi.fn(), signUp:vi.fn(), signOut:vi.fn(), retry:vi.fn(),
};
const mockAuth=(patch:Partial<AuthContextValue>)=>mockedUseAuth.mockReturnValue({...defaultAuth,...patch});
describe('Rutas de sesión', () => {
 beforeEach(() => mockAuth({}));
 it('redirige anónimo de /tasks a /login', async () => {
   render(<MemoryRouter initialEntries={['/tasks']}><Routes>
     <Route path="/login" element={<div>Acceso público</div>}/>
     <Route element={<ProtectedRoute />}><Route path="/tasks" element={<div>Privado</div>}/></Route>
   </Routes></MemoryRouter>);
   expect(await screen.findByText('Acceso público')).toBeInTheDocument();
 });
 it('muestra validación mientras comprueba sesión', () => {
   mockAuth({status:'checking'});
   render(<MemoryRouter initialEntries={['/tasks']}><Routes>
     <Route element={<ProtectedRoute />}><Route path="/tasks" element={<div>Privado</div>}/></Route>
   </Routes></MemoryRouter>);
   expect(screen.getByText('Validando sesión…')).toBeInTheDocument();
 });
 it('permite entrar a usuario autenticado', () => {
   mockAuth({status:'authenticated',token:'token-falso'});
   render(<MemoryRouter initialEntries={['/tasks']}><Routes>
     <Route element={<ProtectedRoute />}><Route path="/tasks" element={<div>Privado</div>}/></Route>
   </Routes></MemoryRouter>);
   expect(screen.getByText('Privado')).toBeInTheDocument();
 });
 it('redirige autenticado de /login a /tasks', async () => {
   mockAuth({status:'authenticated',token:'token-falso'});
   render(<MemoryRouter initialEntries={['/login']}><Routes>
     <Route element={<PublicOnlyRoute />}><Route path="/login" element={<div>Login</div>}/></Route>
     <Route path="/tasks" element={<div>Tareas</div>}/>
   </Routes></MemoryRouter>);
   expect(await screen.findByText('Tareas')).toBeInTheDocument();
 });
});
