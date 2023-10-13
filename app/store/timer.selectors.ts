import { createSelector } from '@ngrx/store';
import { TimerState } from './timer.reducer';

export const selectTime = createSelector(
  (state: { timer: TimerState }) => state.timer,
  (timer) => timer.time
);
export const selectIsRunning = createSelector(
  (state: { timer: TimerState }) => state.timer,
  (timer) => timer.isRunning
);

