import { createAction, props } from '@ngrx/store';

export const decrement = createAction('[Counter Component] Decrement');
export const customInput = createAction('[Counter Component] Custom Input', props<{ value: number }>());
export const increment = createAction('[Counter Component] Increment');
export const init = createAction('[Counter Component] Init');
export const reset = createAction('[Counter Component] Reset');
export const errorOccurred = createAction('[Counter] Error Occurred', props<{ error: AppError }>());


export type AppError = {
  message: string;
  code: number; // Puedes incluir más información si es necesario
};
