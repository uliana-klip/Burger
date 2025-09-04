import { deleteCookie, getCookie, setCookie } from './cookie';

type TAuthToken = {
  accessToken: string;
  refreshToken: string;
};

export function setAuthTokens(tokens: TAuthToken): void {
  if (tokens.accessToken && tokens.refreshToken) {
    const accessToken = tokens.accessToken.startsWith('Bearer ')
      ? tokens.accessToken.slice(7)
      : tokens.accessToken;
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  } else console.error('ошибка при получении токенов ');
}

export function getAccessToken(): string | undefined {
  return getCookie('accessToken');
}

export function getRefreshToken(): string | null {
  return localStorage.getItem('refreshToken');
}

export function clearAuthTokens(): void {
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
}
