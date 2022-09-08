
export const create = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));

  return localStorage[key];
}

export const get = (key: string) => {
  const item = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : null;
  
  return item;
}

export const remove = (key: string) => {
  localStorage.removeItem(key);
}
  
export const clear = () => {
  localStorage.clear();
}

export type History = {
  command: string,
  output: string[],
  path: string []
}

export type Directories = {
  
}