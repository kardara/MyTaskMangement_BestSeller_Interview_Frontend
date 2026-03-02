export const getToken = (): string | null => {
  const raw = localStorage.getItem("token");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as string;
  } catch {
    return raw;
  }
};

export const setToken = (token: string): void =>
  localStorage.setItem("token", token);

export const removeToken = (): void => localStorage.removeItem("token");
