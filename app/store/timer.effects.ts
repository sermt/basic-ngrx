import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { increment, start, reset, setInitialTime, stop } from "./timer.actions";
import { of, switchMap, tap, withLatestFrom } from "rxjs";
import { AppState } from "src/appReducer";
import { Store } from "@ngrx/store";
import { selectTime } from "./timer.selectors";

@Injectable()
export class TimerEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  storeValue$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, stop, reset),
        withLatestFrom(this.store.select(selectTime)),
        tap(([action, value]) => localStorage.setItem("time", String(value)))
      ),
    { dispatch: false }
  );

  loadValue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(start),
      switchMap(() => {
        const storedTime = localStorage.getItem("time");
        if (storedTime) {
          return of(setInitialTime({ time: Number(storedTime) }));
        }
        return of(setInitialTime({ time: 0 }));
      })
    )
  );
}
