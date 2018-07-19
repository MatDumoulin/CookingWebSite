import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeGridComponent } from './recipe-grid.component';

describe('RecipeGridComponent', () => {
  let component: RecipeGridComponent;
  let fixture: ComponentFixture<RecipeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
