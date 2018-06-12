import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
// Moment
import * as moment from "moment";
// Ngrx Store
import { Store, ActionsSubject } from "@ngrx/store";
import * as fromStore from "../../core/store";
// Rxjs
import { Subscription, Observable } from "rxjs";

import { ApiSpecificRecipeService, Recipe } from "./../../recipes/shared";

@Component({
    selector: "mcb-recipe-viewer",
    templateUrl: "./recipe-viewer.component.html",
    styleUrls: ["./recipe-viewer.component.css"]
})
export class RecipeViewerComponent implements OnInit, OnDestroy {
    private recipe$: Observable<Recipe>;
    recipe: Recipe;
    defaultImage = Recipe.DEFAULT_IMAGE;
    biggestSection = [];
    private subscription: Subscription;

    constructor(
        private recipeApi: ApiSpecificRecipeService,
        private store: Store<fromStore.DataState>
    ) {}

    ngOnInit() {
        // Getting the recipe to view from the store.
        this.recipe$ = this.store.select(fromStore.getSelectedRecipe);
        this.subscription = this.recipe$.subscribe(recipe => {
            this.recipe = recipe;

            if (recipe) {
                this.biggestSection = this.getBiggestSection();
            }
        });
    }

    ngOnDestroy() {
        // Cleaning up resources.
        this.subscription.unsubscribe();
    }

    convertToTime(minutes: number): string {
        // If there are minutes to display, display them.
        if (minutes) {
            const duration = moment.duration(minutes, "minutes");
            // Formatting the time to display.
            if (duration.asDays() > 1) {
                return `${Math.floor(
                    duration.asDays()
                )}j ${duration.hours()}h${duration.minutes()}`;
            } else if (duration.asHours() > 1) {
                return `${Math.floor(
                    duration.asHours()
                )}h${duration.minutes()}`;
            } else if (duration.asMinutes() > 1) {
                return `${Math.floor(duration.asMinutes())}`;
            }
        }
        // Else, display --.
        return "--";
    }

    private getBiggestSection() {
        if (
            this.recipe.ingredientSection.length >=
            this.recipe.stepSection.length
        ) {
            return this.recipe.ingredientSection;
        } else {
            return this.recipe.stepSection;
        }
    }
}
