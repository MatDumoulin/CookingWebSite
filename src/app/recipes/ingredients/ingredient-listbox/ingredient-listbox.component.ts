import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'ingredient-listbox',
  templateUrl: './ingredient-listbox.component.html',
  styleUrls: ['./ingredient-listbox.component.css'],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IngredientListbox),
      multi: true
    }]
})
export class IngredientListbox implements ControlValueAccessor {
  _ingredients: Ingredient[] = [];
  propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {

  }

  set ingredients(newIngredients) {
    this._ingredients = newIngredients;
    this.propagateChange(this.ingredients);
  }

  get ingredients() {
    return this._ingredients;
  }

  addIngredient() {
    this._ingredients.push(new Ingredient());
  }

  removeIngredient(index: number) {
    this._ingredients.splice(index, 1);
  }

// ----------For the ngModel two way binding -------------------------------//
  writeValue(ingredients: Ingredient[]) {
    // When ngModel is called only to enable form validation, the value is set to undefined.
    if (ingredients === undefined) {
      // If it is the case, do nothing as we don't want to register something.
      return;
    }

    this.ingredients = ingredients;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
