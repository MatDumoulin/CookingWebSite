import { TestBed, async, ComponentFixture} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { StarRating } from './star-rating.component';

describe('Star Rating', () => {
  let comp:    StarRating;
  let fixture: ComponentFixture<StarRating>;
  let starEl:  DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StarRating
      ],
    }).compileComponents();
  }));

  // Testing if the star rating is created.
  it('should create the star rating', async(() => {
    const fixture = TestBed.createComponent(StarRating);
    const rating = fixture.debugElement.componentInstance;
    expect(rating).toBeTruthy();
  }));


  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(StarRating);
    comp    = fixture.componentInstance;
    starEl  = fixture.debugElement.query(By.css('.star-rating')); // find hero element
  });

  it(`should have proper rating value`, () => {
    const expectedRating = 1;
    comp.value = expectedRating;
    fixture.detectChanges(); // trigger initial data binding

    expect(comp.value).toEqual(expectedRating);
  });

  it(`should contain stars with proper filled value when value is min`, () => {
    const expectedRating = 1;
    comp.value = expectedRating;
    fixture.detectChanges(); // trigger initial data binding

    let numberOfFilledStar = countFilledStars(comp);

    expect(numberOfFilledStar).toEqual(expectedRating);
  });

  it(`should contain stars with proper filled value when value is max`, () => {
    const expectedRating = 5;
    comp.value = expectedRating;
    fixture.detectChanges(); // trigger initial data binding

    let numberOfFilledStar = countFilledStars(comp);

    expect(numberOfFilledStar).toEqual(expectedRating);
  });

  it(`should display proper rating`, () => {
    const expectedRating = 4;
    comp.value = expectedRating;
    fixture.detectChanges(); // trigger initial data binding

    let displayedRating = getDisplayedRating(starEl);

    expect(displayedRating).toEqual(expectedRating);
  });

  it(`should allow having more than five stars`, () => {
    const expectedMax = 10;

    comp.max = expectedMax;
    fixture.detectChanges(); // trigger initial data binding

    let numberOfStars = countDisplayedStars(starEl);

    expect(numberOfStars).toEqual(expectedMax);
  });

  it(`should allow having less than five stars`, () => {
    const expectedMax = 3;

    comp.max = expectedMax;
    fixture.detectChanges(); // trigger initial data binding

    let numberOfStars = countDisplayedStars(starEl);

    expect(numberOfStars).toEqual(expectedMax);
  });

  it(`should set a new rating when not set to readonly and is clicked`, () => {
    const expectedValue = 5;
    const initialValue = 1; // Rating before the user clicks on the star rating.

    comp.value = initialValue;
    comp.readonly = false;
    fixture.detectChanges(); // The rating is now 1.

    // This variable initialization must be after the detectChanges() method since
    // the method creates our component.
    const fifthStar = starEl.queryAll(By.css('.star'))[expectedValue-1]; // Index is 0 based.

    fifthStar.triggerEventHandler('click', null); // Clicking on the fifth star.
    fixture.detectChanges(); // Value is now supposed to be 5.

    let displayedRating = getDisplayedRating(starEl);

    expect(displayedRating).toEqual(expectedValue);
  });

  it(`should set a new rating when set to readonly and is clicked`, () => {
    const expectedValue = 1;
    const initialValue = 1; // The rating before the user clicks on the star rating.
    const clickedRating = 5; // The rating that is clicked by the user.

    comp.value = initialValue;
    comp.readonly = true;
    fixture.detectChanges(); // The rating is now 1.

    // This variable initialization must be after the detectChanges() method since
    // the method creates our component.
    const fifthStar = starEl.queryAll(By.css('.star'))[clickedRating-1]; // Index is 0 based.

    fifthStar.triggerEventHandler('click', null); // Clicking on the fifth star.
    fixture.detectChanges();
    // Value is supposed to remain the same since the control is read only.

    let displayedRating = getDisplayedRating(starEl);

    expect(displayedRating).toEqual(expectedValue);
  });


});

function countFilledStars(starRatingComponent: StarRating): number {
    let numberOfFilledStars = 0;

    for(let star of starRatingComponent.stars) {
      if(star.filled) {
        ++numberOfFilledStars;
      }
    }

    return numberOfFilledStars;
}

function getDisplayedRating(starRatingElement: DebugElement): number {
    let displayedRating = 0;

    for(let displayedStar of starRatingElement.queryAll(By.css('.star'))) {
      if(displayedStar.classes.filled) {
        ++displayedRating;
      }
    }

    return displayedRating;
}

function countDisplayedStars(starRatingElement: DebugElement): number {
    return starRatingElement.queryAll(By.css('.star')).length;
}
