import { createAction, props } from '@ngrx/store';

export const decrement = createAction('[Counter Component] Decrement');
export const customInput = createAction('[Counter Component] Custom Input', props<{ value: number }>());
export const increment = createAction('[Counter Component] Increment');
export const init = createAction('[Counter Component] Init');
export const reset = createAction('[Counter Component] Reset');

