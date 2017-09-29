import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { StepSection } from '../shared/step-section.model';
import { CustomListBox } from '../../../controls/custom-listbox/custom-listbox.component';

@Component({
  selector: 'step-section-wrapper',
  templateUrl: './step-section-wrapper.component.html',
  styleUrls: ['./step-section-wrapper.component.css'],
    providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StepSectionWrapper),
      multi: true
    }]
})
export class StepSectionWrapper implements ControlValueAccessor {
  _sections: StepSection[];
  propagateChange = (_: any) => {};

  constructor() {}

  ngOnInit() {
    this.sections = [new StepSection()];
  }

  set sections(sections) {
    this._sections = sections;
    this.propagateChange(this.sections);
  }

  get sections() {
    return this._sections;
  }

  createNewSection() {
    this.sections.push(new StepSection());
  }

  // ----------For the ngModel two way binding -------------------------------//
  writeValue(sections: StepSection[]) {
    // When ngModel is called only to enable form validation, the value is set to undefined.
    if (sections === undefined) {
      // If it is the case, do nothing as we don't want to register something.
      return;
    }
    this.sections = sections;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
