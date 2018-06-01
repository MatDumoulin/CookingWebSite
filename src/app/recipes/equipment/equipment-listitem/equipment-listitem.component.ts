import { Component, OnInit, Input, Output, forwardRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'equipment-listitem',
  templateUrl: './equipment-listitem.component.html',
  styleUrls: ['./equipment-listitem.component.css'],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EquipmentListItem),
      multi: true
    }]
})
export class EquipmentListItem implements ControlValueAccessor, OnInit {
  _item = "";
  @Output()remove = new EventEmitter<number>();
  propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {

  }

  set item(newItem) {
    this._item = newItem;
    this.propagateChange(this._item);
  }

  get item() {
    return this._item;
  }

  removeItem() {
    this.remove.emit();
  }

// ----------For the ngModel two way binding -------------------------------//
  writeValue(item: string) {
    // When ngModel is called only to enable form validation, the value is set to undefined.
    if (item === undefined) {
      // If it is the case, do nothing as we don't want to register something.
      return;
    }

    this.item = item;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
