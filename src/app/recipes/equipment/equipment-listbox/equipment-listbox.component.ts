import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'equipment-listbox',
  templateUrl: './equipment-listbox.component.html',
  styleUrls: ['./equipment-listbox.component.css'],
    providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EquipmentListBox),
      multi: true
    }]
})
export class EquipmentListBox implements ControlValueAccessor, OnInit {
  _equipments = [""];
  propagateChange = (_: any) => {};

  constructor() {}

  ngOnInit() {

  }

  set equipments(equipments) {
    this._equipments = equipments;
    this.propagateChange(this.equipments);
  }

  get equipments() {
    return this._equipments;
  }

  createItem() {
    this.equipments.push("");
  }

  removeItem(index: number) {
    this._equipments.splice(index, 1);
  }

  // ----------For the ngModel two way binding -------------------------------//
  writeValue(equipments: string[]) {
    // When ngModel is called only to enable form validation, the value is set to undefined.
    if (equipments === undefined) {
      // If it is the case, do nothing as we don't want to register something.
      return;
    }
    this.equipments = equipments;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  // Since the equipment array is a primitive array, if this function is omitted,
  // Angular tracks the array item by its value. This means that whenever the value
  // is changed, the list item will loose focus. Instead of tracking by value,
  // we tell Angular to track the items by their index.
  trackByFn(index: any, item: any) {
     return index;
  }
}
