import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  customInput,
  decrement,
  increment,
  init,
  reset,
} from './counter.actions';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { AppState } from 'src/appReducer';
import { Store } from '@ngrx/store';
import { selectCount } from './counter.selectors';

@Injectable()
export class CounterEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  storeValue$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(decrement, customInput, increment, reset),
        withLatestFrom(this.store.select(selectCount)),
        tap(([action, value]) => localStorage.setItem('count', String(value)))
      ),
    { dispatch: false }
  );

  loadCounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const storedCount = localStorage.getItem('count');
        if (storedCount) {
          return of(customInput({ value: Number(storedCount) }));
        }
        return of(customInput({ value: 0 }));
      })
    )
  );
}
