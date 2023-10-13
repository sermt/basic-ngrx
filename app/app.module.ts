import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { CounterOutputComponent } from "./counter-output/counter-output.component";
import { CounterControlsComponent } from "./counter-controls/counter-controls.component";
import { StoreModule } from "@ngrx/store";
import { appReducers } from "src/appReducer";
import { FormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { CounterEffects } from "./store/counter.effects";
import { TimerComponent } from './timer/timer.component';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { TimerEffects } from "./store/timer.effects";

@NgModule({
  declarations: [
    AppComponent,
    CounterOutputComponent,
    CounterControlsComponent,
    TimerComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(appReducers),
    FormsModule,
    EffectsModule.forRoot([CounterEffects,TimerEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
