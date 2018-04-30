import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeInputMomentComponent } from './time-input-moment.component';

describe('TimeInputMomentComponent', () => {
  let component: TimeInputMomentComponent;
  let fixture: ComponentFixture<TimeInputMomentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeInputMomentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeInputMomentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
