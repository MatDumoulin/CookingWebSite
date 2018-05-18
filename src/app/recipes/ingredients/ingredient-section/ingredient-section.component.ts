import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IngredientSection } from '../shared/ingredient-section.model';

@Component({
    selector: 'ingredient-section',
    templateUrl: './ingredient-section.component.html',
    styleUrls: ['./ingredient-section.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => IngredientSectionComponent),
        multi: true
    }]
})
export class IngredientSectionComponent implements ControlValueAccessor, OnInit {
    _section: IngredientSection;
    propagateChange = (_: any) => { };

    constructor() { }

    ngOnInit() {
        this.section = new IngredientSection();
    }

    set section(newSection) {
        this._section = newSection;
        this.propagateChange(this.section);
    }

    get section() {
        return this._section;
    }

    // ----------For the ngModel two way binding -------------------------------//
    writeValue(section: IngredientSection) {
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

    registerOnTouched() { }
}
