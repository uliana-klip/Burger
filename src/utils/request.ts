import { checkResponse } from './check-response';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export default async function request<T>(
  endpoint: string,
  options: RequestInit & { headers?: Record<string, string>; _retry?: boolean } = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  return await checkResponse(res);
}
