import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeInput } from './time-input.component';

describe('TimeInputComponent', () => {
  let component: TimeInput;
  let fixture: ComponentFixture<TimeInput>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeInput ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
