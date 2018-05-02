import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ElementRef,
    forwardRef,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Renderer2,
    Self,
    ViewChild
} from "@angular/core";
import {
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
    NG_VALUE_ACCESSOR,
    NgControl,
    Validators,
    AbstractControl
} from "@angular/forms";
import { MatFormFieldControl } from "@angular/material";
import { FocusMonitor, FocusOrigin } from "@angular/cdk/a11y";
import { UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW } from "@angular/cdk/keycodes";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Subject } from "rxjs/Subject";
// Moment
import { Moment } from "moment";
import * as moment from "moment";

@Component({
    selector: "mcb-time-input-moment",
    templateUrl: "./time-input-moment.component.html",
    styleUrls: ["./time-input-moment.component.css"],
    providers: [
        { provide: MatFormFieldControl, useExisting: TimeInputMomentComponent },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TimeInputMomentComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeInputMomentComponent implements OnInit, OnDestroy, MatFormFieldControl<Moment>, ControlValueAccessor {
    static nextId = 0;
    // Inputs and Outputs
    @Input() hoursSeparator = ":";
    @Input() minutesSeparator = "";
    // Time management
    time: Moment;
    private readonly MINUTES_UNIT_INCREMENT_STEP = 1;
    private readonly MINUTES_DECIMAL_INCREMENT_STEP = 10;
    private readonly HOURS_UNIT_INCREMENT_STEP = 60;
    private readonly HOURS_DECIMAL_INCREMENT_STEP = 600;
    // Form element management
    private _preventFocusLoss = false;
    stateChanges = new Subject<void>();
    @ViewChild("minutesUnit") minutesUnit: ElementRef;
    @ViewChild("minutesDecimal") minutesDecimal: ElementRef;
    @ViewChild("hoursUnit") hoursUnit: ElementRef;
    @ViewChild("hoursDecimal") hoursDecimal: ElementRef;
    //////////////////////////////////////////////////////////////////
    // For Mat Form Field
    // Used by Angular Material to map hints and errors to the control.
    @HostBinding() id = `time-input-${TimeInputMomentComponent.nextId++}`;
    // Used by Angular Material to bind Aria ids to our control
    @HostBinding("attr.aria-describedby") describedBy = "";

    parts: FormGroup;
    private _placeholder: string;
    focused = false;
    private _required = false;
    private _disabled = false;
    errorState = false; // For now, we are not handling errors yet.
    controlType = "time-input"; // Class identifier for this control will be mat-form-field-time-input.

    // NgModel
    propagateChange = (_: any) => { };
    public ngControl: NgControl = null;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        fb: FormBuilder,
        private fm: FocusMonitor,
        private elRef: ElementRef,
        renderer: Renderer2) {

        // Form initialization. On top of a directive that prevents the input of non
        // numerical char, we add a pattern to assure that only numbers are allowed.
        this.parts = fb.group({
            hoursUnit: ["", Validators.pattern(/[0-9]/)],
            hoursDecimal: ["", Validators.pattern(/[0-9]/)],
            minutesDecimal: ["", Validators.pattern(/[0-9]/)],
            minutesUnit: ["", Validators.pattern(/[0-9]/)]
        });

        fm.monitor(elRef.nativeElement, true).subscribe(origin => this.handleFocusChange(origin));
    }

    /**
     * This function is to fix an undesired interaction that caused the component to loose focus when the used clicks on a separator.
     */
    keepFocus() {
        this._preventFocusLoss = true;
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        // Cleaning up resources.
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef.nativeElement);
    }

    // This is where the NgModel with update our time.
    @Input()
    get value(): Moment {
        return this.time;
    }
    set value(time: Moment | null) {
        if (time) {
            this.time = time.clone();
            this.displayedHours = this.time.format("HH");
            this.displayedMinutes = this.time.format("mm");
        } else {
            this.time = null;
            this.displayedHours = "";
            this.displayedMinutes = "";
        }

        this.emitChanges();
    }

    /**
     * Gets the string representation of the displayed time.
     */
    private getDisplayedTime(): string {
        return this.displayedHours + this.displayedMinutes;
    }

    /**
     * Sets the displayed hours to the given value.
     * Note: This affectation will not change the ngModel value.
     */
    set displayedHours(hours: string) {
        this.parts.get('hoursDecimal').setValue(hours.charAt(hours.length - 2));
        this.parts.get('hoursUnit').setValue(hours.charAt(hours.length - 1));
    }
    get displayedHours(): string {
        return this.parts.get('hoursDecimal').value + this.parts.get('hoursUnit').value;
    }

    /**
     * Sets the displayed minutes to the given value.
     * Note: This affectation will not change the ngModel value.
     */
    set displayedMinutes(minutes: string) {
        this.parts.get('minutesDecimal').setValue(minutes.charAt(minutes.length - 2));
        this.parts.get('minutesUnit').setValue(minutes.charAt(minutes.length - 1));
    }
    get displayedMinutes(): string {
        return this.parts.get('minutesDecimal').value + this.parts.get('minutesUnit').value;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Time management
    /**
     * Updates both the ngModel time and the displayed time of the control with the values
     * currently displayed in the time input.
     */
    updateTime(): void {
        this.updateDisplayedTime();
        this.setTimeFromString(this.displayedHours, this.displayedMinutes);
    }

    /**
     * Updates the time displayed in the time input. This function does not change the NgModel.
     */
    updateDisplayedTime(): void {
        let displayedTime = this.getDisplayedTime();
        displayedTime = displayedTime.slice(-4); // Take only the last four characters for our time.

        this.displayedMinutes = displayedTime.slice(-2); // Take only the last two characters.
        this.displayedHours = displayedTime.slice(0, -2); // Take all characters but the last two.
    }

    /**
     * Converts a time string into a proper time format. It also set the ngModel time to the converted value.
     * @param hoursString The hours to set. The hours will be converted to a 24 hours format. This means that
     *                    if the given hour is 25, the displayed hours will be 1.
     * @param minutesString The minutes to set. The minutes will be onverted to a 60 minutes format. This means
     *                      if the given minute 61, it will add an hour and set the minutes to 01.
     */
    setTimeFromString(hoursString: string, minutesString: string): void {
        // First of, we parse the strings to number in order to validate if they are numbers.
        const hours = parseInt(hoursString, 10);
        const minutes = parseInt(minutesString, 10);

        // The strings can be NaN if they are empty, null, undefined or contain a letter.
        if (Number.isNaN(hours) && Number.isNaN(minutes)) {
            this.time = null;
        }
        else {
            this.time = moment.utc();
            this.time.hours(Number.isNaN(hours) ? 0 : hours);
            this.time.minutes(Number.isNaN(minutes) ? 0 : minutes);
        }

        this.emitChanges();
    }

    /**
     * This function takes a the hours and minutes and parses it to a time format.
     * Precisely, if the hours and minutes are 9999 (99 hours and 99 minutes), it will convert it to
     *
     */
    private formatDislayedTime() {
        if (!this.time || !this.time.isValid()) {
            this.displayedHours = "";
            this.displayedMinutes = "";
        }
        // Else, update the model with the written time.
        else {
            this.displayedHours = this.padWithChar("0", this.time.hours().toString(), 2);
            this.displayedMinutes = this.padWithChar("0", this.time.minutes().toString(), 2);
        }
    }

    /**
     * Pads the given value with the given char. The padding is added at the beginning of the value.
     * @param char The char to use as padding. Its length must be of 1.
     * @param valueToPad The string value you want to pad.
     * @param desiredFinalLength The final desired length of the string.
     * @returns The padded representation of the given value.
     */
    private padWithChar(char: string, valueToPad: string, desiredFinalLength: number): string {
        if (!char || char.length !== 1) {
            throw new Error("[padWithChar] Cannot have multiple characters as padding. Only one is allowed.");
        }

        const paddedString = char.repeat(desiredFinalLength) + valueToPad;
        return paddedString.slice(desiredFinalLength * -1);
    }


    ////////////////////////////////////////////////////////////////////////////
    // Event handling
    private handleFocusChange(origin: FocusOrigin): void {
        const elementIsFocused = !!origin;
        // If the component just gain the focus, automatically focus the rightmost input.
        if (!this.focused && elementIsFocused) {
            this.focusLastInput(origin);
        }

        // Setting up the focused state. The element is focused when we prevent the focus loss
        // or when it is really focused.
        this.focused = this._preventFocusLoss || elementIsFocused;

        // If the component has been focused out, format the displayed time.
        if (!this.focused) {
            this.formatDislayedTime();
        }
        // The focus loss prevention is only applied once. After that, return to normal focus management.
        this._preventFocusLoss = false;

        this.stateChanges.next();
    }

    private handleKeydown(event: KeyboardEvent, targettedInputName: string): void {

        if (event.keyCode === UP_ARROW) {
            const incrementStep = this.getIncrementStep(targettedInputName);
            this.incrementTime(incrementStep);
            event.stopPropagation(); // prevents the carret from moving
            return;
        }
        else if (event.keyCode === DOWN_ARROW) {
            const incrementStep = this.getIncrementStep(targettedInputName);
            this.incrementTime(incrementStep * -1);
            event.stopPropagation(); // prevents the carret from moving
            return;
        }
        else if (event.keyCode === LEFT_ARROW) {
            const leftSibling = this.getLeftSiblingOfInput(targettedInputName);
            if (leftSibling) {
                this.keepFocus();
                this.focusInput(leftSibling.nativeElement, "keyboard");
                event.stopPropagation(); // prevents the carret from moving
            }
            return;
        }
        else if (event.keyCode === RIGHT_ARROW) {
            const rightSibling = this.getRightSiblingOfInput(targettedInputName);
            if (rightSibling) {
                this.keepFocus(); // Otherwise, the focus is lost momentarly
                this.focusInput(rightSibling.nativeElement, "keyboard");
                event.stopPropagation(); // prevents the carret from moving
            }
            return;
        }
    }

    /**
     * Increments the current time by the given amount of minutes.
     * @param incrementStep The increment step, in minutes.
     */
    incrementTime(incrementStep: number) {
        if (!this.time) {
            this.time = moment.utc().startOf('day');
        }

        this.time.add(incrementStep, 'minutes');
        // Once the ngModel is updated, update the displayed time.
        this.formatDislayedTime();
    }

    /**
     * @returns The proper increment step, based on the given input name.
     */
    private getIncrementStep(inputName: string): number {
        switch (inputName) {
            case 'hoursDecimal': return this.HOURS_DECIMAL_INCREMENT_STEP;
            case 'hoursUnit': return this.HOURS_UNIT_INCREMENT_STEP;
            case 'minutesDecimal': return this.MINUTES_DECIMAL_INCREMENT_STEP;
            case 'minutesUnit': return this.MINUTES_UNIT_INCREMENT_STEP;
        }
    }

    private getLeftSiblingOfInput(inputName: string): ElementRef | null {
        switch (inputName) {
            case 'hoursDecimal': return null;
            case 'hoursUnit': return this.hoursDecimal;
            case 'minutesDecimal': return this.hoursUnit;
            case 'minutesUnit': return this.minutesDecimal;
        }
    }
    private getRightSiblingOfInput(inputName: string): ElementRef | null {
        switch (inputName) {
            case 'hoursDecimal': return this.hoursUnit;
            case 'hoursUnit': return this.minutesDecimal;
            case 'minutesDecimal': return this.minutesUnit;
            case 'minutesUnit': return null;
        }
    }

    /**
     * Focuses the last input in the control.
     */
    focusLastInput(origin: FocusOrigin): void {
        this.focusInput(this.minutesUnit.nativeElement, origin);
    }

    private focusInput(input: HTMLElement, origin: FocusOrigin): void {
        if (input && origin) {
            this.fm.focusVia(input, origin);
        }
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
        return !this.displayedHours && !this.displayedMinutes;
    }

    // Used by Angular Material to display the placeholder properly
    @HostBinding("class.floating")
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
        this.describedBy = ids.join(" ");
    }

    // To handle onClick event on form field container when it's not directly on an input
    onContainerClick(event: MouseEvent) {
        if ((event.target as Element).tagName.toLowerCase() !== "input") {
            this.focusLastInput("mouse");
        }
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
