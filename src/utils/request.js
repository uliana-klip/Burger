import { checkResponse } from './check-response';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export default async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  return await checkResponse(res);
}
