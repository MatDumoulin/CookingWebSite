import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RecipeCreatorModule } from './../../recipe-creator/recipe-creator.module';
import { IngredientSectionWrapper } from './ingredient-section-wrapper.component';
import { IngredientSection } from '../shared/ingredient-section.model';

describe('IngredientSectionWrapperComponent', () => {
  let component: IngredientSectionWrapper;
  let fixture: ComponentFixture<IngredientSectionWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RecipeCreatorModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientSectionWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new section when requested', () => {
    const createSectionBtn = fixture.debugElement.query(By.css('#createSectionBtn'));
    const sections = [new IngredientSection()];

    // Applying a know value for the sections attribute.
    component.sections = sections;
    fixture.detectChanges();

    createSectionBtn.triggerEventHandler('click', null); // Clicking on the button.
    fixture.detectChanges();

    expect(component.sections.length).toEqual(2);
  });
});
