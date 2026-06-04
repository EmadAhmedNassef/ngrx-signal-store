import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { catchError, exhaustMap, of, pipe, tap } from 'rxjs';
import { Auth } from '../../services/auth';
import { initialState, User } from './auth.state';

const AUTH_STORAGE_KEY = 'auth';

function persistUser(user: User | null): void {
  if (user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user }));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

function loadPersistedUser(): User | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as { user?: User };
    return parsed.user ?? null;
  } catch {
    return null;
  }
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withHooks({
    onInit(store) {
      const user = loadPersistedUser();
      if (user) {
        patchState(store, { user });
      }
    },
  }),
  withMethods(
    (
      store,
      authService = inject(Auth),
      router = inject(Router),
      toastr = inject(ToastrService),
    ) => ({
      login: rxMethod<{ email: string; password: string }>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          exhaustMap(({ email, password }) => {
            const toastrInfo = toastr.info('Logging in...', 'Logging in...', {
              disableTimeOut: true,
              closeButton: false,
              tapToDismiss: false,
            });

            return authService.login(email, password).pipe(
              tap((user) => {
                toastr.clear(toastrInfo.toastId);
                toastr.success('Login successful!', 'Login successful!');
                patchState(store, { user, loading: false, error: null });
                persistUser(user);
                router.navigate(['/courses']);
              }),
              catchError((error) => {
                const message = error?.error?.error?.message ?? 'Login failed';
                toastr.clear(toastrInfo.toastId);
                toastr.error(message, 'Login failed!');
                patchState(store, { loading: false, error: message });
                return of(null);
              }),
            );
          }),
        ),
      ),
      logout(): void {
        patchState(store, { user: null, loading: false, error: null });
        persistUser(null);
        router.navigate(['/login']);
      },
    }),
  ),
);
