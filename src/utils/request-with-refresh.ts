import { refreshTokenRequest } from './api';
import {
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
  clearAuthTokens,
} from './auth-tokens';
import request from './request';

type TError = {
  status?: number;
  message?: string;
};

export const requestWithRefresh = async <T>(
  endpoint: string,
  options: RequestInit & { headers?: Record<string, string>; _retry?: boolean } = {}
): Promise<T> => {
  try {
    if (!options.headers) {
      options.headers = {};
    }
    const token = getAccessToken();
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }
    const response = await request<T>(endpoint, options);
    return response;
  } catch (error) {
    const err = error as TError;
    if (
      err.status !== 401 &&
      !(
        err.status === 403 &&
        err.message &&
        err.message.toLowerCase().includes('jwt expired')
      )
    ) {
      throw error;
    }
    if (options._retry === true) {
      throw error;
    }
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw error;
      }
      const tokens = await refreshTokenRequest({ refreshToken });
      setAuthTokens(tokens);
      if (!options.headers) {
        options.headers = {};
      }
      const refreshed = tokens.accessToken.startsWith('Bearer ')
        ? tokens.accessToken.slice(7)
        : tokens.accessToken;
      options.headers.Authorization = `Bearer ${refreshed}`;
      options._retry = true;
      return await request<T>(endpoint, options);
    } catch (refreshError) {
      clearAuthTokens();
      throw refreshError;
    }
  }
};
