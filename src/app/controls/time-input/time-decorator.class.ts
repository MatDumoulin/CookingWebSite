import {Time} from './time/time.class';

export class TimeDecorator extends Time {

  constructor(hours:number, minutes:number) {
    super(hours, minutes);
  }

  set minutes(newValue:number) {
    if(newValue < 0) {
      newValue = 0;
    }

    if(newValue >= 60) {
      newValue = 59;
    }

    this._minutes = newValue;
  }
}
