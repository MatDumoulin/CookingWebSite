import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepListbox } from './step-listbox.component';

describe('IngredientListboxComponent', () => {
  let component: StepListbox;
  let fixture: ComponentFixture<StepListbox>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepListbox ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepListbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
