const TOKEN_KEY = 'token';

export const login = () => {
  localStorage.setItem(TOKEN_KEY, 'TestLogin');
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY);


}