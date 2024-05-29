export function addLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function readLocalStorage(key: string) {
  return localStorage.getItem(key);
}
