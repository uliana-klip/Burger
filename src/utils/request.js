import checkResponse from './check-response';
export const BASE_URL = 'https://norma.nomoreparties.space/api';

export default function request(endpoint, options) {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
}
