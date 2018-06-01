import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCreatorFormComponent } from './recipe-creator-form.component';

describe('RecipeCreatorFormComponent', () => {
  let component: RecipeCreatorFormComponent;
  let fixture: ComponentFixture<RecipeCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
