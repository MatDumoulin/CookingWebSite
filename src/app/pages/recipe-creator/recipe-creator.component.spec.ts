import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCreatorComponent } from './recipe-creator.component';

describe('RecipeCreatorComponent', () => {
  let component: RecipeCreatorComponent;
  let fixture: ComponentFixture<RecipeCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
