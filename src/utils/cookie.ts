export function setCookie(name: string, value: string): void {
  const encodedValue = encodeURIComponent(value);
  const baseCookie = name + '=' + encodedValue;
  document.cookie = `${baseCookie}; path=/`;
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string): void {
  document.cookie = `${name}=; max-age=0; path=/`;
}
