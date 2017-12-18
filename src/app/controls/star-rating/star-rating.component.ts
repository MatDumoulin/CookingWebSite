import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Star } from './star/star.model';


// Here I'm creating my custom star rating component since the only other
@Component({
  selector: 'star-rating',
  templateUrl: 'star-rating.html',
  styleUrls: ['star-rating.css'],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRating),
      multi: true
    }]
})
export class StarRating implements ControlValueAccessor{
  // The number of star displayed.
  @Input()
  max:number = 5;
  // The number of star that must be selected.
  @Input()
  _value:number = 0;
  @Input()
  readonly:boolean = false;
  @Output()
  change = new EventEmitter();

  stars:Star[] = [];
  propagateChange = (_: any) => {};

  constructor() {}

  ngOnInit() {
    for(let i = 1; i <= this.max; ++i) {
      this.stars.push(new Star(i <= this.value));
    }
  }

  // The index is a 0 based index.
  toggle(index:number) {
    if(index < 0) {
      throw new RangeError("Invalid parameter index in function 'toggle' of the StarRating component. It's value must be a positive number.");
    }

    if(this.readonly === false) {
      this.value = index + 1;
      // Triggering the change event.
      this.change.emit();
    }
  }

  set value(newRating) {
    this._value = newRating;

    this.updateDisplay();

    this.propagateChange(this.value);
  }

  get value() {
    return this._value;
  }

  private updateDisplay() {

    for(let i = 0; i < this.stars.length; ++i) {
      this.stars[i].filled = i < this.value;
    }
  }

  // ----------For the ngModel two way binding -------------------------------//
  writeValue(value: number) {
    // When ngModel is called only to enable form validation, the value is set to undefined.
    if (value === undefined) {
      // If it is the case, do nothing as we don't want to register a rating.
      return;
    }

    if(value < 0) {
      throw new RangeError("Invalid parameter value in function 'writeValue' of the StarRating component. It's value must be a positive number.");
    }

    this.value = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

}
