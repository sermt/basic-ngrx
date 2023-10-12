import { CounterOutputComponent } from './counter-output.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CounterOutputComponentHarness } from './counter-output.component.harness';
import { MockStore, provideMockStore } from '@ngrx/store/testing';


describe('CounterOutputComponent', () => {
  let fixture: ComponentFixture<CounterOutputComponent>;
  let componentHarness: CounterOutputComponentHarness;
  let store: MockStore;

  const appIni = {
    count: 0
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterOutputComponent],
      providers: [
        provideMockStore({ initialState: appIni }),
      ],
    }).compileComponents();

     store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CounterOutputComponent);
    componentHarness = await TestbedHarnessEnvironment.harnessForFixture(fixture, CounterOutputComponentHarness);
  });

  it('should display default value when initialized', async () => {
    expect(await componentHarness.hasParagraphWithText('Value: 0')).toBeTrue();
  });

  it('should display double value when initialized', async () => {
    expect(await componentHarness.hasParagraphWithText('Double: 0')).toBeTrue();
  })

  it('should display value correctly when value changed', async () => {
    const updatedAppState = {
      count: 5
    };

    store.setState(updatedAppState);

    expect(await componentHarness.hasParagraphWithText('Value: 5')).toBeTrue();
  })

  it('should display value correctly when value changed', async () => {
    const updatedAppState = {
      count: 5
    };

    store.setState(updatedAppState);

    expect(await componentHarness.hasParagraphWithText('Double: 10')).toBeTrue();
  })
});

