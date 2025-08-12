export function setCookie(name, value) {
  const encodedValue = encodeURIComponent(value);
  const baseCookie = name + '=' + encodedValue;
  document.cookie = `${baseCookie}; path=/`;
}

export function getCookie(name) {
  const matches = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
  document.cookie = `${name}=; max-age=0; path=/`;
}
