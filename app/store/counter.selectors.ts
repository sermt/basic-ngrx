import { createSelector } from '@ngrx/store';

export const selectCount = createSelector(
  (state: { count: number }) => state.count,
  (count) => count
);
export const doubleCount = createSelector(
  selectCount,
  (state: number) => state * 2
);
