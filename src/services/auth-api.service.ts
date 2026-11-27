import type { AuthUser, LoginCredentials, LoginResponse, RegisterInput, RegisterResponse, MeResponse } from '../models/auth.types';
import { http } from './http.service';
export type { AuthUser } from '../models/auth.types';
export async function register(input: RegisterInput): Promise<AuthUser> {
 return (await http<RegisterResponse>('/auth/register', '', { method: 'POST', body: input })).data.user;
}
export async function login(input: LoginCredentials): Promise<{ token: string; user: AuthUser }> {
 const result = await http<LoginResponse>('/auth/login', '', { method: 'POST', body: input });
 return { token: result.data.accessToken, user: result.data.user };
}
export async function getMe(token: string): Promise<AuthUser> {
 return (await http<MeResponse>('/auth/me', token)).data.user;
}
