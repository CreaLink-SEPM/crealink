export function storeTokens({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) {
    window.localStorage.setItem('accessToken', accessToken);
    window.localStorage.setItem('refreshToken', refreshToken);
  }
  
  export function getTokens() {
    return {
      token: window.localStorage.getItem('accessToken'),
      refreshToken: window.localStorage.getItem('refreshToken'),
    };
  }
  
  export function clearTokens() {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
  }
  