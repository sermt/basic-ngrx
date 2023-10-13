import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, interval, Subject, takeUntil, tap } from "rxjs";
import { AppState } from "src/appReducer";
import { selectIsRunning, selectTime } from "../store/timer.selectors";
import { start, stop, increment, reset } from "../store/timer.actions";

@Component({
  selector: "app-timer",
  templateUrl: "./timer.component.html",
  styleUrls: ["./timer.component.css"],
})
export class TimerComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>) {}
  time!: Observable<number>;
  isRunning!: Observable<boolean>;
  destroy$ = new Subject<void>();
  private _currentTime = 0;

  ngOnInit(): void {
    this.startTimer();
    this.time = this.store.select(selectTime);
    this.isRunning = this.store.select(selectIsRunning);
  }

  startTimer(): void {
    this.store.dispatch(start());
    interval(1000)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this._currentTime++)
      )
      .subscribe(() => {
        this.store.dispatch(increment({ time: this._currentTime }));
      });
  }

  stopTimer(): void {
    this.store.dispatch(stop());
    this.destroy$.next();
  }

  resetTimer(): void {
    this.store.dispatch(reset());
    this.stopTimer();
    this._currentTime = 0;
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  get currentTime(): number {
    return this._currentTime;
  }
}
