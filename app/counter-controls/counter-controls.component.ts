import { Component } from '@angular/core';

import { AppState } from 'src/appReducer';
import { Store } from '@ngrx/store';
import {
  increment,
  decrement,
  reset,
  customInput,
} from '../store/counter.actions';

@Component({
  selector: 'app-counter-controls',
  templateUrl: './counter-controls.component.html',
  styleUrls: ['./counter-controls.component.css'],
})
export class CounterControlsComponent {
  constructor(private store: Store<AppState>) {}

  value:string = '';

  increment(): void {
    this.store.dispatch(increment());
  }

  decrement(): void {
    this.store.dispatch(decrement());
  }

  reset(): void {
    this.store.dispatch(reset());
  }
  onAddValue(): void {
    if (typeof this.value !== 'number') {
      alert('Please enter a valid number');
      return;
    }

    this.store.dispatch(customInput({ value: Number(this.value) }));
  }
}


