import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'custom-listbox',
  templateUrl: './custom-listbox.html',
  styleUrls: ['./custom-listbox.css']
})
export class CustomListBox {
  @Input()
  title: string = "Default Title";
  @Input()
  addItemText: string = "Add";
  @Output()
  createNewItem = new EventEmitter();

  constructor() { }

  addItem() {
    this.createNewItem.emit();
  }
}
