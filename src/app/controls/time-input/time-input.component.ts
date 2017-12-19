import {FocusMonitor} from '@angular/cdk/a11y';
import { Component, OnInit, ElementRef, Input, OnDestroy, Renderer2, HostBinding, Optional, Self, forwardRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgControl} from '@angular/forms';
import { Time } from './time/time.class';
import { MatFormFieldControl } from '@angular/material/form-field';
import {Subject} from 'rxjs/Subject';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.css'],
  providers: [
      {provide: MatFormFieldControl, useExisting: TimeInput},
      {provide: NG_VALUE_ACCESSOR,useExisting: forwardRef(() => TimeInput), multi: true}
  ],
})
export class TimeInput implements OnInit, OnDestroy, MatFormFieldControl<number>, ControlValueAccessor{
  static nextId = 0;

  MINUTES_MAX = 59;
  HOURS_SEPARATOR = 'h';
  MINUTES_SEPARATOR = 'm';
  // Form element management
  parts: FormGroup;
  stateChanges = new Subject<void>();
  // Used by Angular Material to map hints and errors to the control.
  @HostBinding() id = `time-input-${TimeInput.nextId++}`;
  // Used by Angular Material to bind Aria ids to our control
  @HostBinding('attr.aria-describedby') describedBy = '';
  // NgModel
  propagateChange = (_: any) => {};
  // Form properties
  private _placeholder: string;
  focused = false;
  private _required = false;
  private _disabled = false;
  errorState = false;                      // For now, we are not handling errors yet.
  controlType = 'time-input';  // Class identifier for this control will be mat-form-field-time-input.
  // Model used for this type of input
  time: Time;

  public ngControl: NgControl = null;


  constructor(fb: FormBuilder, private fm: FocusMonitor, private elRef: ElementRef,
            renderer: Renderer2) {
    this.parts =  fb.group({
      'hours': '',
      'minutes': ''
    });

    fm.monitor(elRef.nativeElement, renderer, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  ngOnInit() {
    this.time = new Time(0, 0);
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  @Input()
  get value(): number {
    let n = this.parts.value;
    return this.time.totalMinutes;
  }
  set value(timeInMinutes: number | null) {
    timeInMinutes = timeInMinutes || 0;
    this.time.setTimeFromMinutes(timeInMinutes);
    this.parts.setValue({hours: this.time.hours, minutes: this.time.minutes});

    this.emitChanges();
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  // This functions tells the mat-form-field wheter it is empty or not.
  get empty() {
    let n = this.parts.value;
    return !n.hours && !n.minutes;
  }

  // Used by Angular Material to display the placeholder properly
  @HostBinding('class.floating')
  get shouldPlaceholderFloat() {
    return this.focused || !this.empty;
  }

  // To handle required property on form field
  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  // To handle disabled property on form field.
  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }

  // To handle aria description
  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  // To handle onClick event on form field container when it's not directly on an input
  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this.elRef.nativeElement.querySelector('input').focus();
    }
  }

  // Event handling
  incrementHours(e:KeyboardEvent) {
    if(e.key == "ArrowUp")
      this.time.incrementHours();
    else if(e.key == "ArrowDown" && this.time.hours > 0)
      this.time.decrementHours();

    return;
  }

  incrementMinutes(e:KeyboardEvent) {
    if(e.key == "ArrowUp")
      this.time.incrementMinutes();
    else if(e.key == "ArrowDown" && (this.time.hours != 0 || this.time.minutes > 0))
      this.time.decrementMinutes();

    return;
  }

  emitChanges() {
    this.stateChanges.next();
    this.propagateChange(this.value);
  }

  // ----------For the ngModel two way binding -------------------------------//
  writeValue(value: number) {
    this.value = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
