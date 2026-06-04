export interface CounterState {
  count: number;
  name: string;
}

export const initialState: CounterState = {
  count: 0,
  name: 'Emad Ahmed',
};

const STORAGE_KEY = 'counter-store';

export function loadCounterState(): CounterState {
  const savedState = localStorage.getItem(STORAGE_KEY);
  return savedState ? JSON.parse(savedState) : initialState;
}

export function saveCounterState(state: CounterState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
