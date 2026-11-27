export type UserRole = 'user' | 'admin';
export interface AuthUser {
 id: string; name: string; email: string; role: UserRole;
 createdAt: string; updatedAt: string;
}
export interface LoginCredentials { email: string; password: string }
export interface RegisterInput extends LoginCredentials { name: string }
export interface LoginResponse { data: { user: AuthUser; accessToken: string; tokenType: 'Bearer'; expiresIn: string } }
export interface RegisterResponse { data: { user: AuthUser } }
export interface MeResponse { data: { user: AuthUser } }
export type AuthStatus = 'checking' | 'anonymous' | 'authenticated' | 'error';
