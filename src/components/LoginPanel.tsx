import { useState } from 'react';
import type { FormEvent } from 'react';
import { login } from '../services/auth-api.service';
import type { AuthUser } from '../services/auth-api.service';
interface Props { onLogin: (token: string, user: AuthUser) => void }
export function LoginPanel({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(''); setBusy(true);
    try {
      const result = await login(email, password);
      onLogin(result.token, result.user);
      setPassword('');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'No fue posible iniciar sesión.');
    } finally { setBusy(false); }
  }
  return <div className="app-shell">
    <header className="app-header"><div className="app-header__content">
      <h1>Administrador de tareas</h1><p>Conexión a la API REST</p>
    </div></header>
    <main className="app-main">
      <section className="panel auth-panel">
        <h2>Iniciar sesión para consultar tareas</h2>
        <p>Esta pantalla habilita el Backend con JWT. La gestión completa de sesión corresponde a A11.</p>
        <form className="task-form" onSubmit={e => { void submit(e); }}>
          <label htmlFor="login-email">Correo</label>
          <input id="login-email" type="email" required value={email}
            onChange={e => setEmail(e.target.value)} />
          <label htmlFor="login-password">Contraseña</label>
          <input id="login-password" type="password" required value={password}
            onChange={e => setPassword(e.target.value)} />
          <button disabled={busy} type="submit">{busy ? 'Iniciando…' : 'Iniciar sesión'}</button>
        </form>
        {error && <p role="alert" className="field-error">{error}</p>}
      </section>
    </main>
  </div>;
}
