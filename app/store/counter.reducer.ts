import { createReducer, on, Action } from '@ngrx/store';
import { increment, decrement, reset, customInput } from './counter.actions';

export const initialState = 0;

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0),
  on(customInput, (state, { value }) => state + value)
);

export function counterReducer(state = initialState, action: Action) {
  return _counterReducer(state, action);
}
