export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface User {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};
