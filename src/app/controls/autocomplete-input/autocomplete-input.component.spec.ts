import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteInput } from './autocomplete-input.component';

describe('AutocompleteInputComponent', () => {
  let component: AutocompleteInput;
  let fixture: ComponentFixture<AutocompleteInput>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteInput ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
