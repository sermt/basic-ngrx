import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import {
  increment,
  start,
  reset,
  setInitialTime,
  stop,
  errorOccurred,
} from "./timer.actions";
import { of, switchMap, tap, withLatestFrom, catchError } from "rxjs";
import { AppState } from "src/appReducer";
import { Store } from "@ngrx/store";
import { selectTime } from "./timer.selectors";

@Injectable()
export class TimerEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  // Effect to store the timer value in localStorage
  storeValue$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, stop, reset),
        withLatestFrom(this.store.select(selectTime)),
        tap(([_, value]) => {
          try {
            localStorage.setItem("time", String(value));
          } catch (error) {
            // Handle localStorage errors here
          }
        })
      ),
    { dispatch: false }
  );

  // Effect to load the time value from localStorage when the application initializes
  loadValue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(start),
      switchMap(() => {
        try {
          const storedTime = localStorage.getItem("time");
          if (storedTime) {
            return of(setInitialTime({ time: Number(storedTime) }));
          }
        } catch (error) {}
        return of(setInitialTime({ time: 0 }));
      }),
      catchError((error) => {
        return of(errorOccurred({ error }));
      })
    )
  );
}
