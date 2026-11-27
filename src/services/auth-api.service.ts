import { http } from './http.service';
interface User { id: string; name: string; email: string; role: 'user' | 'admin' }
export type AuthUser = User;
export async function login(email: string, password: string): Promise<{ token: string; user: User }> {
  const body = await http<{ data: { accessToken: string; user: User } }>(
    '/auth/login', '', { method: 'POST', body: { email, password } },
  );
  return { token: body.data.accessToken, user: body.data.user };
}
export async function getMe(token: string): Promise<User> {
  const body = await http<{ data: { user: User } }>('/auth/me', token);
  return body.data.user;
}
