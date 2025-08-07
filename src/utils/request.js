import { refreshTokenRequest } from './api';
import checkResponse from './check-response';
import { getCookie, setCookie } from './cookie';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export default async function request(endpoint, options) {
  try {
    let res = await fetch(`${BASE_URL}${endpoint}`, options);
    if (res.status === 403) {
      const refreshToken = getCookie('refreshToken');
      const refreshRes = await refreshTokenRequest(refreshToken);
      const newAccessToken = refreshRes.accessToken.slice(7);
      setCookie('token', newAccessToken);
      options.headers = {
        ...options.headers,
        Authorization: 'Bearer ' + newAccessToken,
      };
      res = await fetch(`${BASE_URL}${endpoint}`, options);
      if (res.ok) {
        return await checkResponse(res);
      }
    } else if (res.ok) {
      return await checkResponse(res);
    }
  } catch (error) {
    console.error(error);
  }
}
