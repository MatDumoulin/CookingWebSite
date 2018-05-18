import {
    Component, OnInit, OnDestroy, Input, Output,
    forwardRef, ElementRef, EventEmitter,
    Renderer2, HostBinding, Optional, ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import { MatFormFieldControl } from '@angular/material/form-field';


/**
 * AutocompleteInput is an input with the autocomplete functionnality.
 *
 * The "input" event is used to notify when the value is changed (either by keypress or by selecting an item in the autocomplete form)
 */
export abstract class AutocompleteInput implements OnInit, OnDestroy, MatFormFieldControl<string>, ControlValueAccessor {
    static nextId = 0;

    @ViewChild(MatAutocomplete) matAutocomplete: MatAutocomplete;
    // Changing the input event so that it triggers when an autocomplete option is chosen.
    @Output()
    input = new EventEmitter();
    // Getting the function that calls the API to get the options to display in the autocomplete
    abstract optionsGetter(): void;
    // The displayed value in the input.
    _value: string;
    // The displayed options displayed by the autocomplete section.
    options = [];
    optionHasFocus = false;

    // Form element management
    stateChanges = new Subject<void>();
    // Used by Angular Material to map hints and errors to the control.
    @HostBinding() id = `autocomplete-input-${AutocompleteInput.nextId++}`;
    // Used by Angular Material to bind Aria ids to our control
    @HostBinding('attr.aria-describedby') describedBy = '';
    // NgModel
    propagateChange = (_: any) => { };
    // Form properties
    private _placeholder: string;
    focused = false;
    private _required = false;
    private _disabled = false;
    errorState = false;                      // For now, we are not handling errors yet.
    controlType = 'autocomplete-input';  // Class identifier for this control will be mat-form-field-autocomplete-input.

    public ngControl: NgControl = null;


    constructor(private fm: FocusMonitor, private elRef: ElementRef, renderer: Renderer2) {
        fm.monitor(elRef.nativeElement, true).subscribe(origin => {
            this.focused = !!origin || this.optionHasFocus;
            this.stateChanges.next();
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef.nativeElement);
    }

    @Input()
    get value() {
        return this._value;
    }

    set value(newValue: string | null) {
        this._value = newValue || "";

        this.emitChanges();
    }

    // Allows to select the first option on 'enter' pressed
    chooseFirstOption(): void {
        this.matAutocomplete.options.first.select();
    }

    // Makes this component compatible with the mat-form-field of Angular Material
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
        return !this.value;
    }

    // Used by Angular Material to display the placeholder properly
    @HostBinding('class.floating')
    get shouldLabelFloat() {
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
        const target = (event.target as Element).tagName.toLowerCase();
        if (target !== 'input' && target !== 'div') {
            this.elRef.nativeElement.querySelector('input').focus();
        }
    }

    // To handle focus.
    // Needed to indicate that our control still has focus when one of the autocomplete option is clicked.
    // This is needed mainly because Angular Material extracts all of the options to put it in a separate
    // container in the DOM.
    focusIn() {
        this.optionHasFocus = true;
    }

    focusOut() {
        this.optionHasFocus = false;
    }

    valueChanged() {
        this.optionsGetter();
        this.input.emit();
    }

    emitChanges() {
        this.stateChanges.next();
        this.propagateChange(this.value);
    }

    // ----------For the ngModel two way binding -------------------------------//
    writeValue(value: string) {
        // When ngModel is called only to enable form validation, the value is set to undefined.
        if (value === undefined) {
            // If it is the case, do nothing as we don't want to register a rating.
            return;
        }

        this.value = value;
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() { }
}
