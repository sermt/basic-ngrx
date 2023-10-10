import { createSelector } from '@ngrx/store';

export const selectCount = (state: { count: number }) => state.count;
export const doubleCount = createSelector(
  selectCount,
  (state: number) => state * 2
);
