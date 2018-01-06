import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientAutocompleteInput } from './ingredient-autocomplete-input.component';

describe('IngredientAutocompleteInput', () => {
  let component: IngredientAutocompleteInput;
  let fixture: ComponentFixture<IngredientAutocompleteInput>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientAutocompleteInput ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientAutocompleteInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
