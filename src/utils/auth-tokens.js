import { deleteCookie, getCookie, setCookie } from './cookie';

export function setAuthTokens(tokens) {
  if (tokens.accessToken && tokens.refreshToken) {
    const accessToken = tokens.accessToken.startsWith('Bearer ')
      ? tokens.accessToken.slice(7)
      : tokens.accessToken;
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  } else console.error('ошибка при получении токенов ');
}

export function getAccessToken() {
  return getCookie('accessToken');
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

export function clearAuthTokens() {
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
}
