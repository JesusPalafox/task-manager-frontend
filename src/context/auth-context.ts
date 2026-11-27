import { createContext } from 'react';
import type { AuthStatus, AuthUser, LoginCredentials, RegisterInput } from '../models/auth.types';
export interface AuthContextValue {
 status: AuthStatus; user: AuthUser | null; token: string | null; error: string;
 signIn: (input: LoginCredentials) => Promise<void>;
 signUp: (input: RegisterInput) => Promise<void>;
 signOut: () => void; retry: () => void;
}
export const AuthContext = createContext<AuthContextValue | null>(null);
