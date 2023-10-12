import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { AppComponent } from "./app.component";
import { AppComponentHarness } from "./app.component.harness";
import { CounterOutputComponent } from "./counter-output/counter-output.component";
import { CounterControlsComponent } from "./counter-controls/counter-controls.component";
import { FormsModule } from "@angular/forms";
import { AppState, appReducers } from "src/appReducer";
import { StoreModule } from "@ngrx/store";
import { selectCount } from "./store/counter.selectors";

describe("AppComponent", () => {
  let fixture: ComponentFixture<AppComponent>;
  let componentHarness: AppComponentHarness;
  let store: MockStore<AppState>;
  const appInitialState: AppState = {
    count: 0,
  };

  afterEach(async () => {
    store.resetSelectors();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CounterOutputComponent,
        CounterControlsComponent,
      ],

      providers: [provideMockStore({ initialState: appInitialState })],
      imports: [FormsModule, StoreModule.forRoot(appReducers)],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    store = TestBed.inject(MockStore);
    componentHarness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      AppComponentHarness
    );
  });

  it("should display default value when initialized", async () => {
    expect(await componentHarness.hasParagraphWithText("Value: 0")).toBeTrue();
  });

  it("should display double value when initialized", async () => {
    expect(await componentHarness.hasParagraphWithText("Double: 0")).toBeTrue();
  });

  it("should display correct value when incremented", async () => {
    store.overrideSelector(selectCount, 1);
    store.refreshState();

    await componentHarness.clickIncrementButton();

    expect(await componentHarness.hasParagraphWithText("Value: 1")).toBeTrue();
  });

  it("should display double value when incremented", async () => {
    store.overrideSelector(selectCount, 1);
    store.refreshState();

    await componentHarness.clickIncrementButton();

    expect(await componentHarness.hasParagraphWithText("Double: 2")).toBeTrue();
  });
});
