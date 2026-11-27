import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/useAuth';
export function RegisterPage() {
 const { signUp } = useAuth(); const navigate = useNavigate();
 const [name,setName]=useState(''); const [email,setEmail]=useState('');
 const [password,setPassword]=useState(''); const [busy,setBusy]=useState(false);const [error,setError]=useState('');
 async function submit(event: FormEvent<HTMLFormElement>) {
   event.preventDefault(); setBusy(true); setError('');
   try { await signUp({name,email,password});setPassword('');navigate('/login',{replace:true}); }
   catch (reason) { setError(reason instanceof Error ? reason.message:'No se pudo registrar.'); }
   finally {setBusy(false);}
 }
 return <section className="panel auth-panel"><h2>Crear cuenta</h2>
   <form className="task-form" onSubmit={e=>{void submit(e);}}>
     <label htmlFor="register-name">Nombre</label>
     <input id="register-name" required minLength={2} maxLength={80} value={name} onChange={e=>setName(e.target.value)} autoComplete="name"/>
     <label htmlFor="register-email">Correo</label>
     <input id="register-email" required type="email" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/>
     <label htmlFor="register-password">Contraseña (mínimo 8 caracteres)</label>
     <input id="register-password" required type="password" minLength={8} value={password} onChange={e=>setPassword(e.target.value)} autoComplete="new-password"/>
     <button disabled={busy}>{busy?'Registrando…':'Registrarme'}</button>
   </form>
   {error && <p className="field-error" role="alert">{error}</p>}
   <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
 </section>;
}
