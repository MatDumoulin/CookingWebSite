import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientListboxComponent } from './ingredient-listbox.component';

describe('IngredientListboxComponent', () => {
  let component: IngredientListboxComponent;
  let fixture: ComponentFixture<IngredientListboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientListboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientListboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
