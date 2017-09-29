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

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
