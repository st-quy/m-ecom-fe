export const setAccessToken = (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken);
  };
  
  export const getAccessToken = (): string | null => {
    return localStorage.getItem('accessToken');
  };
  
  export const removeAccessToken = () => {
    localStorage.removeItem('accessToken');
  };