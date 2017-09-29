import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCreatorModule } from './../../recipe-creator/recipe-creator.module';
import { StepListbox } from './step-listbox.component';

describe('IngredientListboxComponent', () => {
  let component: StepListbox;
  let fixture: ComponentFixture<StepListbox>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RecipeCreatorModule ]
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
