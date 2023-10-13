import { ActionReducerMap } from '@ngrx/store';
import { counterReducer } from './app/store/counter.reducer';
import { timerReducer, TimerState } from './app/store/timer.reducer';

export interface AppState {
  count: number;
  timer: TimerState
}

export const appReducers: ActionReducerMap<AppState> = {
  count: counterReducer,
  timer: timerReducer
};
