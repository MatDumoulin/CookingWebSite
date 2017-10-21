import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'step-listbox',
  templateUrl: './step-listbox.component.html',
  styleUrls: ['./step-listbox.component.css'],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StepListbox),
      multi: true
    }]
})
export class StepListbox implements ControlValueAccessor {
  _steps: string[] = [];
  propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {

  }

  set steps(newSteps) {
    this._steps = newSteps;
    this.propagateChange(this.steps);
  }

  get steps() {
    return this._steps;
  }

  addStep() {
    this._steps.push("");
  }

  removeStep(index: number) {
    this._steps.splice(index, 1);
  }

// ----------For the ngModel two way binding -------------------------------//
  writeValue(steps: string[]) {
    // When ngModel is called only to enable form validation, the value is set to undefined.
    if (steps === undefined) {
      // If it is the case, do nothing as we don't want to register something.
      return;
    }

    this.steps = steps;
  }

  registerOnChange() {}

  registerOnTouched() {}

  // Since the steps array is a primitive array, if this function is omitted,
  // Angular tracks the array item by its value. This means that whenever the value
  // is changed, the list item will loose focus. Instead of tracking by value,
  // we tell Angular to track the items by their index.
  trackByFn(index: any, item: any) {
     return index;
  }
}
