export interface SignupState {
  loading: boolean;
  error: string | null;
}

export const initialState: SignupState = {
  loading: false,
  error: null,
};
