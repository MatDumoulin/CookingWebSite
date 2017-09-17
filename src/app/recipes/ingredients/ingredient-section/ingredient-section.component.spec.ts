import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientSectionComponent } from './ingredient-section.component';

describe('IngredientSectionComponent', () => {
  let component: IngredientSectionComponent;
  let fixture: ComponentFixture<IngredientSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
