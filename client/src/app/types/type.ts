type AuthStateType = {
  email?: string;
  name?: string;
  username?: string;
  password?: string;
  password_confirmation?: string;
};

type AuthErrorType = {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
};
