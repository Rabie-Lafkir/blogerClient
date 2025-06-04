import api, { type ApiResponse } from './axios';

type RegisterDto = { username: string; email: string; password: string, firstName: string, lastName: string, phone: string };
type LoginDto = { email: string; password: string };
type User   = { id: string; username: string; email: string };

export const register = (data: RegisterDto): ApiResponse =>
  api.post('/auth/register', data);

export const login = async (creds: LoginDto): Promise<User> => {
  const res = await api.post<{ token: string; user: User }>(
    '/auth/login',
    creds
  );
  localStorage.setItem('token', res.data.token);
  return res.data.user;
};

export const logout = () => localStorage.removeItem('token');
