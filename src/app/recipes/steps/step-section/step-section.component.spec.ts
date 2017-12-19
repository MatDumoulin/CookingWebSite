import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { RecipeCreatorModule } from './../../recipe-creator/recipe-creator.module';
import { StepSectionComponent } from './step-section.component';

describe('StepSectionComponent', () => {
  let component: StepSectionComponent;
  let fixture: ComponentFixture<StepSectionComponent>;
  let sectionNameControl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RecipeCreatorModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepSectionComponent);
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

    console.log(sectionNameControl.nativeElement.value + "         Test Step");
    expect(sectionNameControl.nativeElement.value).toEqual(SECTION_NAME);
  });*/
});
