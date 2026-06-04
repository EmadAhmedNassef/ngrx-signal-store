import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { CategoriesService } from '../../services/categories';
import { initialState } from './categories.state';

export const CategoriesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, categoriesService = inject(CategoriesService)) => {
    const fetchCategories = rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() =>
          categoriesService.getCategories().pipe(
            tap(({ categories, results }) => {
              patchState(store, {
                categories,
                results,
                loading: false,
                error: null,
                loaded: true,
              });
              console.log('Store after patch:', store.categories());
            }),
            catchError((error) => {
              const message = error?.error?.message ?? 'Failed to load categories';
              patchState(store, { loading: false, error: message });
              return of(null);
            }),
          ),
        ),
      ),
    );

    return {
      /** يجلب من الـ API مرة واحدة فقط — لو الداتا موجودة في الـ store يستخدمها */
      loadCategories(): void {
        if (store.loaded()) {
          return;
        }
        fetchCategories();
      },

      /** يجبر إعادة التحميل من الـ API (مثلاً بعد إضافة category جديدة) */
      refreshCategories(): void {
        fetchCategories();
      },

      getCategoryById(id: string) {
        return store.categories().find((category) => category._id === id);
      },
    };
  }),
);
