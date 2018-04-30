import { Component, OnInit, ElementRef, Input, OnDestroy, Renderer2, HostBinding, Optional, Self, forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs/Subject';
// Moment
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
    selector: 'mcb-time-input-moment',
    templateUrl: './time-input-moment.component.html',
    styleUrls: ['./time-input-moment.component.css'],
    providers: [
        { provide: MatFormFieldControl, useExisting: TimeInputMomentComponent },
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TimeInputMomentComponent), multi: true }
    ],
})
export class TimeInputMomentComponent implements OnInit, OnDestroy, MatFormFieldControl<Moment>, ControlValueAccessor {
    static nextId = 0;
    // Inputs and Outputs
    @Input() hoursSeparator = "h";
    @Input() minutesSeparator = "m";
    // Time management
    time: Moment;
    hoursDecimal = "";
    hoursUnit = "";
    minutesDecimal = "";
    minutesUnit = "";
    // Form element management
    stateChanges = new Subject<void>();
    @ViewChild("lastInput") lastInput: ElementRef;
    //////////////////////////////////////////////////////////////////
    // For Mat Form Field
    // Used by Angular Material to map hints and errors to the control.
    @HostBinding() id = `time-input-${TimeInputMomentComponent.nextId++}`;
    // Used by Angular Material to bind Aria ids to our control
    @HostBinding('attr.aria-describedby') describedBy = '';

    private _placeholder: string;
    focused = false;
    private _required = false;
    private _disabled = false;
    errorState = false;          // For now, we are not handling errors yet.
    controlType = 'time-input';  // Class identifier for this control will be mat-form-field-time-input.

    // NgModel
    propagateChange = (_: any) => { };
    public ngControl: NgControl = null;

    constructor(private fm: FocusMonitor, private elRef: ElementRef,
        renderer: Renderer2) {

        fm.monitor(elRef.nativeElement, true).subscribe(origin => {
            this.focused = !!origin;
            console.log(this.focused);
            this.stateChanges.next();
        });


        this.time = moment.utc('00:00', 'HH:mm');
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef.nativeElement);
    }

    @Input()
    get value(): Moment {
        return this.time;
    }
    set value(time: Moment | null) {
        if (time) {
            this.time = time.clone();
            this.hours = this.time.format('HH');
            this.minutes = this.time.format('mm');
        }
        else {
            this.time = null;
            this.hours = "";
            this.minutes = "";
        }

        this.emitChanges();
    }

    set hours(hours: string) {
        this.hoursDecimal = hours.charAt(hours.length - 2);
        this.hoursUnit = hours.charAt(hours.length - 1);
    }
    get hours(): string {
        return this.hoursDecimal + this.hoursUnit;
    }

    set minutes(minutes: string) {
        this.minutesDecimal = minutes.charAt(minutes.length - 2);
        this.minutesUnit = minutes.charAt(minutes.length - 1);
    }
    get minutes(): string {
        return this.minutesDecimal + this.minutesUnit;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Time management
    updateHours(): void {
        this.updateDisplayedTime();
        this.time = moment.utc(`${this.hours}:${this.minutes}`, "HH:mm");
        console.log(this.time);
    }
    updateMinutes(): void {
        /* const minutesInteger = parseInt(this.minutes, 10); */
        this.updateDisplayedTime();

        // If no minutes are displayed, set the time to null.
        if (!this.minutes) {
            this.time = null;
        }
        // Else, update the model with the written time.
        else {
            let paddedTime = "0000" + this.hours + this.minutes;
            paddedTime = paddedTime.slice(-4);

            this.time = moment.utc(paddedTime, "HH:mm");
        }

        console.log(this.time);
    }

    updateDisplayedTime(): void {
        let concatString = this.hours + this.minutes;
        concatString = concatString.slice(-4); // Take only the last four characters for our time.

        this.minutes = concatString.slice(-2); // Take only the last two characters.
        this.hours = concatString.slice(0, -2); // Take all characters but the last two.
    }

    focusLastInput(event: any): void {
        if (event.target.type !== "text") {
            console.log("Clicked");
            this.fm.focusVia(this.lastInput.nativeElement, "mouse");
        }

        this.focused = true;

        event.stopPropagation();
    }
    ////////////////////////////////////////////////////////////////////////////
    // Mat Form Field support
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
        return !this.hours && !this.minutes;
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
        if ((event.target as Element).tagName.toLowerCase() !== 'input') {
            this.elRef.nativeElement.querySelector('input').focus();
        }
    }

    // Event handling
    incrementHours(e: KeyboardEvent) {
        /*if (e.key === "ArrowUp") {
            this.time.incrementHours();
        }
        else if (e.key === "ArrowDown" && this.time.hours > 0) {
            this.time.decrementHours();
        }*/

        return;
    }

    incrementMinutes(e: KeyboardEvent) {
        console.log(e);
        /*if (e.key === "ArrowUp") {
            this.time.incrementMinutes();
        }
        else if (e.key === "ArrowDown" && (this.time.hours !== 0 || this.time.minutes > 0)) {
            this.time.decrementMinutes();
        }*/

        return;
    }

    emitChanges() {
        this.stateChanges.next();
        this.propagateChange(this.value);
    }

    // ----------For the ngModel two way binding -------------------------------//
    writeValue(value: Moment) {
        this.value = value;
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() { }
}
