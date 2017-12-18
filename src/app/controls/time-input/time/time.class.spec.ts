import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Time } from './time.class';

describe('Time class', () => {
  /*let component: TimeInputComponent;
  let fixture: ComponentFixture<TimeInputComponent>;*/
  let time:Time;

 /* beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeInputComponent ]
    })
    .compileComponents();
  }));*/

  beforeEach(() => {

    /*fixture = TestBed.createComponent(TimeInputComponent);
    component = fixture.componentInstance;*/
    time = new Time(0,0);
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(time).toBeTruthy();
  });

  it('should contain correct time when constructed', () => {
    expect(time.hours).toEqual(0);
    expect(time.minutes).toEqual(0);
  });

  it('should contain correct time when time is changed', () => {
    time.setTime(35, 21);

    expect(time.hours).toEqual(35);
    expect(time.minutes).toEqual(21);
  });

  it('should throw an error when minutes are greater or equal to 60', () => {
    expect(() => { time.minutes = 60 }).toThrowError();
  });

  it('should throw an error when minutes are lower than 0', () => {
    expect(() => { time.minutes = -1 }).toThrowError();
  });

  it('should throw an error when hours are lower than 0', () => {
    expect(() => { time.hours = -1 }).toThrowError();
  });

  // Minutes incrementation and decrementation

  it('should increment minutes by 1 and not change the hours when minutes is below 60', () => {
    time.incrementMinutes();

    expect(time.hours).toEqual(0);
    expect(time.minutes).toEqual(1);
  });

  it('should increment minutes by 1 and increment the hours when minutes is equal or above to 60', () => {
    time.minutes = 59;
    time.incrementMinutes();

    expect(time.hours).toEqual(1);
    expect(time.minutes).toEqual(0);
  });

  it('should decrement minutes and not change the hours when minutes is greater than 0', () => {
    time.minutes = 1;
    time.decrementMinutes();

    expect(time.hours).toEqual(0);
    expect(time.minutes).toEqual(0);
  });

  it('should decrement minutes and hours properly when minutes is equals to 0', () => {
    time.hours = 1;
    time.decrementMinutes();

    expect(time.hours).toEqual(0);
    expect(time.minutes).toEqual(59);
  });

  // Hours incrementation and decrementation
  it('should increment the hours properly', () => {
    time.incrementHours();

    expect(time.hours).toEqual(1);
    expect(time.minutes).toEqual(0);
  });

  it('should decrement the hours properly when hours is greater than 0', () => {
    time.hours = 1;
    time.decrementHours();

    expect(time.hours).toEqual(0);
    expect(time.minutes).toEqual(0);
  });

  // Step size validation
  it('should not have a step size lower than 1', () => {
    expect(() => {time.setStepSize(0)}).toThrowError();
  });

  it('should not have a step size greater or equal to 60', () => {
    expect(() => {time.setStepSize(60)}).toThrowError();
  });

  // Time to Minutes validation
  it('should be set to proper time when initialized with minutes', () => {
    time.setTimeFromMinutes(121);
    expect(time.hours).toBe(2);
    expect(time.minutes).toBe(1);
  });

  it('should return proper time in minutes', () => {
    time.setTime(1, 35);
    expect(time.totalMinutes).toBe(95);
  });
});
