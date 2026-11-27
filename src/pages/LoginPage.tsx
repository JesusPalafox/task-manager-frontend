import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/useAuth';
export function LoginPage() {
 const { signIn } = useAuth(); const navigate = useNavigate(); const location = useLocation();
 const from = (location.state as { from?: unknown } | null)?.from;
 const destination = typeof from === 'string' && /^\/(?!\/|\\)/.test(from) ? from : '/tasks';
 const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
 const [busy,setBusy]=useState(false); const [error,setError]=useState('');
 async function submit(event: FormEvent<HTMLFormElement>) {
   event.preventDefault(); setBusy(true); setError('');
   try { await signIn({ email, password }); setPassword(''); navigate(destination,{replace:true}); }
   catch (reason) { setError(reason instanceof Error ? reason.message : 'No fue posible iniciar sesión.'); }
   finally { setBusy(false); }
 }
 return <section className="panel auth-panel"><h2>Iniciar sesión</h2>
   <form className="task-form" onSubmit={e=>{void submit(e);}}>
     <label htmlFor="auth-email">Correo</label>
     <input id="auth-email" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} />
     <label htmlFor="auth-password">Contraseña</label>
     <input id="auth-password" type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} />
     <button disabled={busy}>{busy?'Iniciando…':'Iniciar sesión'}</button>
   </form>
   {error && <p className="field-error" role="alert">{error}</p>}
   <p>¿No tienes cuenta? <Link to="/register">Registrarme</Link></p>
 </section>;
}
