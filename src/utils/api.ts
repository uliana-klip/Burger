import { getCookie } from './cookie';
import request from './request';
import { requestWithRefresh } from './request-with-refresh';

import type { TUserData } from '@/types';

type TFormFull = {
  email: string;
  password: string;
  name: string;
};

type TFormUpdUser = {
  email?: string;
  password?: string;
  name?: string;
};

type TFormLogin = Omit<TFormFull, 'name'>;

type TFormResetPassword = {
  password: string;
  token: string;
};

type TFormEmail = { email: string };

type TFormRefreshToken = { refreshToken: string };

type TFormLogout = TFormRefreshToken;

type TResponseFull = {
  success: boolean;
  user: TUserData;
  accessToken: string;
  refreshToken: string;
};

type TResponseRefresh = Omit<TResponseFull, 'user'>;

type TResponseLogout = {
  success: boolean;
  message: string;
};

type TResponseResetPass = TResponseLogout;

type TResponseResetReset = TResponseLogout;

type TResponseGet = {
  success: boolean;
  user: TUserData;
};

type TResponsePatch = TResponseGet;

export function loginRequest(form: TFormLogin): Promise<TResponseFull> {
  return request<TResponseFull>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
}

export function registerRequest(form: TFormFull): Promise<TResponseFull> {
  return request<TResponseFull>('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
}

export function forgotPasswordRequest({
  email,
}: TFormEmail): Promise<TResponseResetPass> {
  return request<TResponseResetPass>('/password-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}

export function resetPasswordRequest({
  password,
  token,
}: TFormResetPassword): Promise<TResponseResetReset> {
  return request<TResponseResetReset>('/password-reset/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, token }),
  });
}

export function getUserRequest(): Promise<TResponseGet> {
  const token = getCookie('accessToken');
  return requestWithRefresh<TResponseGet>('/auth/user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function refreshTokenRequest({
  refreshToken,
}: TFormRefreshToken): Promise<TResponseRefresh> {
  return request<TResponseRefresh>('/auth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken }),
  });
}

export function updateUserRequest(form: TFormUpdUser): Promise<TResponsePatch> {
  const token = getCookie('accessToken');
  return requestWithRefresh<TResponsePatch>('/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  });
}

export function logoutRequest({ refreshToken }: TFormLogout): Promise<TResponseLogout> {
  return request<TResponseLogout>('/auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken }),
  });
}
