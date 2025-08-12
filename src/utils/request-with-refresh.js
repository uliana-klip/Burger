import { refreshTokenRequest } from './api';
import {
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
  clearAuthTokens,
} from './auth-tokens';
import request from './request';

export const requestWithRefresh = async (endpoint, options = {}) => {
  try {
    if (!options.headers) {
      options.headers = {};
    }
    const token = getAccessToken();
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }
    const response = await request(endpoint, options);
    return response;
  } catch (error) {
    if (
      error.status !== 401 &&
      !(
        error.status === 403 &&
        error.message &&
        error.message.toLowerCase().includes('jwt expired')
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
      options.headers.Authorization = tokens.accessToken;
      options._retry = true;
      return await request(endpoint, options);
    } catch (refreshError) {
      clearAuthTokens();
      throw refreshError;
    }
  }
};
