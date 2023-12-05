export function storeTokens({ token, refreshToken }: { token: string; refreshToken: string }) {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('refreshToken', refreshToken);
  }
  
  export function getTokens() {
    return {
      token: window.localStorage.getItem('token'),
      refreshToken: window.localStorage.getItem('refreshToken'),
    };
  }
  
  export function clearTokens() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('refreshToken');
  }
  