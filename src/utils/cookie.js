export function setCookie(name, value) {
  const encodedValue = encodeURIComponent(value);
  const baseCookie = name + '=' + encodedValue;
  document.cookie = baseCookie;
}

export function getCookie(name) {
  const matches = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
