import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IngredientSection } from '../shared/ingredient-section.model';
import { CustomListBox } from '../../../controls/custom-listbox/custom-listbox.component';

@Component({
  selector: 'ingredient-section-wrapper',
  templateUrl: './ingredient-section-wrapper.component.html',
  styleUrls: ['./ingredient-section-wrapper.component.css'],
    providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IngredientSectionWrapper),
      multi: true
    }]
})
export class IngredientSectionWrapper implements ControlValueAccessor {
  _sections: IngredientSection[];
  propagateChange = (_: any) => {};

  constructor() {}

  ngOnInit() {
    this.sections = [new IngredientSection()];
  }

  set sections(sections) {
    this._sections = sections;
    this.propagateChange(this.sections);
  }

  get sections() {
    return this._sections;
  }

  createNewSection() {
    this.sections.push(new IngredientSection());
  }

  // ----------For the ngModel two way binding -------------------------------//
  writeValue(sections: IngredientSection[]) {
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
