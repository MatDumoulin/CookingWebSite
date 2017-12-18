export class Time {
  protected STEP_SIZE = 1;
  protected _hours: number = 0;
  protected _minutes: number = 0;

  constructor(hours:number, minutes:number) {
    this.setTime(hours, minutes);
  }

  setTime(hours:number, minutes:number) {
    this.hours = +hours;
    this.minutes = +minutes;
  }

  setTimeFromMinutes(timeInMinutes: number) {
    this.hours = Math.floor(+timeInMinutes/60);
    this.minutes = +timeInMinutes%60;
  }

  setStepSize(step_size:number) {
    if(step_size != null) {

      if(step_size >= 60) {
        throw new Error("Invalid step size for time class. Max step size is 59 for the minutes.");
      }

      if(step_size < 1) {
        throw new Error("Invalid step size for time class. Step size must be positive (cannot be 0).");
      }

      this.STEP_SIZE = step_size;
    }
  }

  /**
   * Increments the number of minutes. The increment size is defined by the STEP_SIZE.
   * If the number of minutes is bigger than 60, it increments the hour value.
   */
  incrementMinutes() {
    if(this._minutes + this.STEP_SIZE >= 60) {
      this.hours++;
    }

    this.minutes = (this.minutes + this.STEP_SIZE) % 60;
  }

  decrementMinutes() {
    if(this._minutes - this.STEP_SIZE < 0) {
      this.hours--;
    }

    this.minutes = ((this.minutes - this.STEP_SIZE) + 60) % 60; // The +60 is to handle properly negative numbers.
  }

  incrementHours() {
    this.hours++;
  }

  decrementHours() {
    this.hours--;
  }

  set hours(newValue:number) {
    if(newValue < 0) {
      throw new Error("Time.class: Hours cannot be negative.");
    }

    this._hours = +newValue;
  }

  get hours() {
    return this._hours;
  }

  set minutes(newValue:number) {
    if(newValue < 0) {
      throw new Error("Time.class: Minutes cannot be negative.");
    }

    if(newValue >= 60) {
      throw new Error("Time.class: Minutes cannot be greater or equal to 60.");
    }

    this._minutes = +newValue;
  }

  get minutes() {
    return this._minutes;
  }

  get totalMinutes() {
    return this.hours * 60 + this.minutes;
  }
}
