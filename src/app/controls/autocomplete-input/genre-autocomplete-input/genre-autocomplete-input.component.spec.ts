import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreAutocompleteInputComponent } from './genre-autocomplete-input.component';

describe('GenreAutocompleteInputComponent', () => {
  let component: GenreAutocompleteInputComponent;
  let fixture: ComponentFixture<GenreAutocompleteInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreAutocompleteInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreAutocompleteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
