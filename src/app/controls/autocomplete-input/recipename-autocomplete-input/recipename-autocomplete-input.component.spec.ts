import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipenameAutocompleteInput } from './recipename-autocomplete-input.component';

describe('RecipenameAutocompleteInput', () => {
  let component: RecipenameAutocompleteInput;
  let fixture: ComponentFixture<RecipenameAutocompleteInput>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipenameAutocompleteInput ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipenameAutocompleteInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
