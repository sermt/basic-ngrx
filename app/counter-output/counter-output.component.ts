import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/appReducer';
import { doubleCount, selectCount } from '../store/counter.selectors';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent implements OnInit {
  constructor(private store: Store<AppState>) {}
  counter!: Observable<number>;
  doubleCount!: Observable<number>;
  ngOnInit(): void {
    this.counter = this.store.select(selectCount);
    this.doubleCount = this.store.select(doubleCount);
  }
}
