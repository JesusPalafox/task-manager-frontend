import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthStatus, AuthUser, LoginCredentials, RegisterInput } from '../models/auth.types';
import { getMe, login, register } from '../services/auth-api.service';
import { clearSessionToken, getSessionToken, saveSessionToken } from '../services/session.service';
import { AuthContext } from './auth-context';
import { HttpError } from '../services/http.service';
export function AuthProvider({ children }: { children: ReactNode }) {
 const [token, setToken] = useState<string | null>(() => getSessionToken());
 const [user, setUser] = useState<AuthUser | null>(null);
 const [status, setStatus] = useState<AuthStatus>(() => getSessionToken() ? 'checking' : 'anonymous');
 const [error, setError] = useState('');
 const [revision, setRevision] = useState(0);
 const signOut = useCallback(() => {
   clearSessionToken(); setToken(null); setUser(null); setStatus('anonymous'); setError('');
 }, []);
 useEffect(() => {
   window.addEventListener('task-auth-expired', signOut);
   return () => window.removeEventListener('task-auth-expired', signOut);
 }, [signOut]);
 useEffect(() => {
   if (!token) return;
   let current = true;
   void getMe(token).then(person => {
     if (!current) return;
     setUser(person); setStatus('authenticated'); setError('');
   }).catch(reason => {
     if (!current) return;
     if (reason instanceof HttpError && reason.status === 401) { signOut(); return; }
     setStatus('error');
     setError(reason instanceof Error ? reason.message : 'No se pudo validar la sesión.');
   });
   return () => { current = false; };
 }, [token, revision, signOut]);
 const signIn = useCallback(async (credentials: LoginCredentials) => {
   const result = await login(credentials);
   saveSessionToken(result.token);
   setToken(result.token); setUser(result.user); setStatus('authenticated'); setError('');
 }, []);
 const signUp = useCallback(async (input: RegisterInput) => { await register(input); }, []);
 const retry = useCallback(() => {
   setStatus('checking'); setError(''); setRevision(n => n + 1);
 }, []);
 const value = useMemo(() => ({ status, user, token, error, signIn, signUp, signOut, retry }),
   [status, user, token, error, signIn, signUp, signOut, retry]);
 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
