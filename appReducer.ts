import { ActionReducerMap } from '@ngrx/store';
import { counterReducer } from './app/store/counter.reducer';

export interface AppState {
  count: number;
}

export const appReducers: ActionReducerMap<AppState> = {
  count: counterReducer,
};
