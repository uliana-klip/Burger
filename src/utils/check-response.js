export const checkResponse = async (res) => {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    const message = data?.message || data?.error || 'Unknown error';
    const error = new Error(message);
    throw Object.assign(error, { status: res.status, data });
  }
};
