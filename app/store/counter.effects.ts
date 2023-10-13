import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  customInput,
  decrement,
  errorOccurred,
  increment,
  init,
  reset,
} from './counter.actions';
import { of, switchMap, tap, withLatestFrom, catchError } from 'rxjs';
import { AppState } from 'src/appReducer';
import { Store } from '@ngrx/store';
import { selectCount } from './counter.selectors';

@Injectable()
export class CounterEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  // Effect to store the counter value in localStorage
  storeValue$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(decrement, customInput, increment, reset),
        withLatestFrom(this.store.select(selectCount)),
        tap(([_, value]) => {
          try {
            localStorage.setItem('count', String(value));
          } catch (error) {
            // Handle localStorage errors here
          }
        })
      ),
    { dispatch: false }
  );

  // Effect to load the counter value from localStorage when the application initializes
  loadCounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        try {
          const storedCount = localStorage.getItem('count');
          if (storedCount) {
            return of(customInput({ value: Number(storedCount) }));
          }
        } catch (error) {
          // Handle localStorage errors here
        }
        return of(customInput({ value: 0 }));
      }),
      catchError(error => {
        return of(errorOccurred({ error: error }));
      })
    )
  );
}
