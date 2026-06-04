import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { catchError, exhaustMap, of, pipe, tap } from 'rxjs';
import { Auth } from '../../services/auth';
import { initialState } from './signup.state';

export const SignupStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      authService = inject(Auth),
      router = inject(Router),
      toastr = inject(ToastrService),
    ) => ({
      signup: rxMethod<{ email: string; password: string }>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          exhaustMap(({ email, password }) => {
            const toastrInfo = toastr.info('Signing up...', 'Signing up...', {
              disableTimeOut: true,
              closeButton: false,
              tapToDismiss: false,
            });

            return authService.signup(email, password).pipe(
              tap(() => {
                toastr.clear(toastrInfo.toastId);
                toastr.success('Signup successful!', 'Signup successful!');
                patchState(store, { loading: false, error: null });
                router.navigate(['/login']);
              }),
              catchError((error) => {
                const message = error?.error?.error?.message ?? 'Signup failed';
                toastr.clear(toastrInfo.toastId);
                toastr.error(message, 'Signup failed!');
                patchState(store, { loading: false, error: message });
                return of(null);
              }),
            );
          }),
        ),
      ),
    }),
  ),
);
