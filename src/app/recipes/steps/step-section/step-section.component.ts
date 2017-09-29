import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { StepSection } from '../shared/step-section.model';

@Component({
  selector: 'step-section',
  templateUrl: './step-section.component.html',
  styleUrls: ['./step-section.component.css'],
    providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StepSectionComponent),
      multi: true
    }]
})
export class StepSectionComponent implements ControlValueAccessor {
  _section: StepSection;
  propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
    this.section = new StepSection();
  }

  set section(newSection) {
    this._section = newSection;
    this.propagateChange(this.section);
  }

  get section() {
    return this._section;
  }

// ----------For the ngModel two way binding -------------------------------//
  writeValue(section: StepSection) {
    // When ngModel is called only to enable form validation, the value is set to undefined.
    if (section === undefined || section === null) {
      // If it is the case, do nothing as we don't want to register something.
      return;
    }

    this.section = section;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
