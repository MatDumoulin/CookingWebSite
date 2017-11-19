import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedRecipeSearchComponent } from './advanced-recipe-search.component';

describe('AdvancedRecipeSearchComponent', () => {
  let component: AdvancedRecipeSearchComponent;
  let fixture: ComponentFixture<AdvancedRecipeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedRecipeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedRecipeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
