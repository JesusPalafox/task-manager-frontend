const TOKEN_KEY = 'task-manager-frontend.access-token';
export const getSessionToken = () => sessionStorage.getItem(TOKEN_KEY);
export const saveSessionToken = (token: string) => sessionStorage.setItem(TOKEN_KEY, token);
export const clearSessionToken = () => sessionStorage.removeItem(TOKEN_KEY);
