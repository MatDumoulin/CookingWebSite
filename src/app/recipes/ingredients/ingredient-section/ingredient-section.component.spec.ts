import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { RecipeCreatorModule } from './../../recipe-creator/recipe-creator.module';
import { IngredientSectionComponent } from './ingredient-section.component';

describe('IngredientSectionComponent', () => {
  let component: IngredientSectionComponent;
  let fixture: ComponentFixture<IngredientSectionComponent>;
  let sectionNameControl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RecipeCreatorModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    sectionNameControl = fixture.debugElement.query(By.css('.section-title'));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  /*it('should display proper section name', () => {
    //const SECTION_NAME = `a#|!"/$%?&*()_+=-±@£¢¤¬¦²³¼½¾^¸;,.É¨:'`;
    const SECTION_NAME = "Bonjour, je suis un test.";

    component._section.name = SECTION_NAME;
    fixture.detectChanges();

    console.log(sectionNameControl.nativeElement.value + "         Test");
    expect(sectionNameControl.nativeElement.value).toBe(SECTION_NAME);
  });*/
});
