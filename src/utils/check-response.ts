type ErrorBody = { message?: string; error?: string };

export const checkResponse = async <T>(res: Response): Promise<T> => {
  const body: unknown = await res.json();

  if (res.ok) {
    return body as T;
  } else {
    const err = body as ErrorBody;
    const message = err.message || err.error || 'Unknown error';
    const error = new Error(message);
    throw Object.assign(error, { status: res.status, data: body });
  }
};
