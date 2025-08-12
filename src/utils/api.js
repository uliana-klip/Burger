import { getCookie } from './cookie';
import request from './request';
import { requestWithRefresh } from './request-with-refresh';

export function loginRequest(form) {
  return request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
}

export function registerRequest(form) {
  return request('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
}

export function forgotPasswordRequest({ email }) {
  return request('/password-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}

export function resetPasswordRequest({ password, token }) {
  return request('/password-reset/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, token }),
  });
}

export function getUserRequest() {
  const token = getCookie('accessToken');
  return requestWithRefresh('/auth/user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function refreshTokenRequest({ refreshToken }) {
  return request('/auth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken }),
  });
}

export function updateUserRequest(form) {
  const token = getCookie('accessToken');
  return requestWithRefresh('/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  });
}

export function logoutRequest({ refreshToken }) {
  return request('/auth/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken }),
  });
}
