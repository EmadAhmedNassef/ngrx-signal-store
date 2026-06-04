// import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
// import { loadCounterState, saveCounterState } from './counter.state';

// export const CounterStore = signalStore(
//   { providedIn: 'root' },
//   withState(loadCounterState()),
//   withMethods((store) => ({
//     increment(): void {
//       patchState(store, (state) => ({ count: state.count + 1 }));
//       saveCounterState({
//         count: store.count(),
//         name: store.name(),
//       });
//     },
//     decrement(): void {
//       patchState(store, (state) => ({ count: state.count - 1 }));
//       saveCounterState({
//         count: store.count(),
//         name: store.name(),
//       });
//     },
//     reset(): void {
//       patchState(store, { count: 0 });
//       saveCounterState({
//         count: store.count(),
//         name: store.name(),
//       });
//     },
//     increaseByAmount(amount: number): void {
//       patchState(store, (state) => ({ count: state.count + amount }));
//       saveCounterState({
//         count: store.count(),
//         name: store.name(),
//       });
//     },
//     decreaseByAmount(amount: number): void {
//       patchState(store, (state) => ({ count: state.count - amount }));
//       saveCounterState({
//         count: store.count(),
//         name: store.name(),
//       });
//     },
//     changeName(name: string): void {
//       patchState(store, { name });
//       saveCounterState({
//         count: store.count(),
//         name: store.name(),
//       });
//     },
//   })),
// );
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';

import { effect } from '@angular/core';

import { initialState, loadCounterState, saveCounterState } from './counter.state';

export const CounterStore = signalStore(
  { providedIn: 'root' },

  // تحميل البيانات أول ما الـ store يبدأ
  withState(loadCounterState()),

  // hooks
  withHooks({
    onInit(store) {
      // أي تغيير يحصل في الـ state يتحفظ تلقائي
      effect(() => {
        saveCounterState({
          count: store.count(),
          name: store.name(),
        });
      });
    },
  }),

  withMethods((store) => ({
    increment(): void {
      patchState(store, (state) => ({
        count: state.count + 1,
      }));
    },

    decrement(): void {
      patchState(store, (state) => ({
        count: state.count - 1,
      }));
    },

    reset(): void {
      patchState(store, {
        count: 0,
      });
    },

    increaseByAmount(amount: number): void {
      patchState(store, (state) => ({
        count: state.count + amount,
      }));
    },

    decreaseByAmount(amount: number): void {
      patchState(store, (state) => ({
        count: state.count - amount,
      }));
    },

    changeName(name: string): void {
      patchState(store, {
        name,
      });
    },
  })),
);
