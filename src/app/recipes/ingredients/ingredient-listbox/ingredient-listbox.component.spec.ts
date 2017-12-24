import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCreatorModule } from './../../recipe-creator/recipe-creator.module';
import { IngredientListbox } from './ingredient-listbox.component';

describe('IngredientListboxComponent', () => {
  let component: IngredientListbox;
  let fixture: ComponentFixture<IngredientListbox>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RecipeCreatorModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientListbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});