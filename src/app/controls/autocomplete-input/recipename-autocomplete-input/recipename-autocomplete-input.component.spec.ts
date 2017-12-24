import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipenameAutocompleteInputComponent } from './recipename-autocomplete-input.component';

describe('RecipenameAutocompleteInputComponent', () => {
  let component: RecipenameAutocompleteInputComponent;
  let fixture: ComponentFixture<RecipenameAutocompleteInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipenameAutocompleteInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipenameAutocompleteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
