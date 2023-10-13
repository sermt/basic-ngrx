import { createReducer, on, Action } from "@ngrx/store";
import { start, stop, increment, reset, setInitialTime } from "./timer.actions";

export const timerInitialState: TimerState = { time: 0, isRunning: false };

const _timerReducer = createReducer(
  timerInitialState,
  on(increment, (state) => ({ ...state, time: state.time + 1 })),
  on(reset, (state) => ({ ...state, time: 0 })),
  on(start, (state) => ({ ...state, isRunning: true })),
  on(stop, (state) => ({ ...state, isRunning: false })),
  on(setInitialTime, (state, { time }) => ({ ...state, time }))
);

export function timerReducer(state = timerInitialState, action: Action) {
  return _timerReducer(state, action);
}

export interface TimerState {
  time: number;
  isRunning: boolean;
}
