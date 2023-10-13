import { createAction, props } from "@ngrx/store";
import { AppError } from "./counter.actions";

export const increment = createAction(
  "[Timer Component] Increment",
  props<{ time: number }>()
);
export const reset = createAction("[Timer Component] Reset");
export const stop = createAction("[Timer Component] Stop");
export const start = createAction("[Timer Component] Start");
export const setInitialTime = createAction("[Timer Component] Set Initial Time", props<{time:number}>());
export const errorOccurred = createAction('[Timer] Error Occurred', props<{ error: AppError }>());
