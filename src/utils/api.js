import { getCookie } from './cookie';
import request from './request';

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

export function passwordForgotRequest(email) {
  return request('/password-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(email),
  });
}

export function resetPassword(form) {
  return request('/password-reset/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
}

export function userRequest() {
  return request('/auth/user', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
    },
  });
}

export function refreshTokenRequest(refreshToken) {
  return request('/auth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: refreshToken }),
  });
}

export function updateUserRequest(form) {
  return request('/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
    },
    body: JSON.stringify(form),
  });
}
