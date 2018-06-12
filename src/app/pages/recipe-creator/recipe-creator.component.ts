import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ApiSpecificRecipeService } from "../../recipes/shared/api-specific-recipe.service";
// Rxjs
import { Observable, Subscription } from "rxjs";
// Ngrx Store
import { Store } from "@ngrx/store";
import * as fromStore from "../../core/store";
// Models
import { Recipe } from "../../recipes/shared/recipe.model";
import { LoggerService } from "../../core/logger";

@Component({
    selector: "mcb-recipe-creator",
    templateUrl: "recipe-creator.component.html",
    styleUrls: ["recipe-creator.component.css"]
})
export class RecipeCreatorComponent implements OnInit, OnDestroy {
    recipe$: Observable<Recipe>;
    originalRecipe: Recipe; // Keeping a copy of the recipe before modification.
    private subscriptions: Subscription[] = [];

    constructor(
        private snackBar: MatSnackBar,
        private loggerService: LoggerService,
        private store: Store<fromStore.DataState>
    ) {}

    ngOnInit() {
        this.recipe$ = this.store.select(fromStore.getSelectedRecipe);

        // Keeping a copy of the recipe in case the user cancels the delete.
        this.subscriptions.push(
            this.recipe$.subscribe(recipe => {
                if (recipe) {
                    this.originalRecipe = Object.assign({}, recipe);
                }
            })
        );
    }

    ngOnDestroy() {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }

    createRecipe(recipe: Recipe): void {
        this.store.dispatch(new fromStore.CreateRecipe(recipe));
    }

    updateRecipe(recipe: Recipe): void {
        this.store.dispatch(new fromStore.UpdateRecipe(recipe));
    }

    deleteRecipe(recipe: Recipe): void {
        this.store.dispatch(new fromStore.DeleteRecipe(recipe._id));
        // Displaying a message to indicate that the recipe was removed.
        const snackBarRef = this.loggerService.action(
            "La recette a été supprimée",
            "Annuler",
            3000
        );
        snackBarRef.onAction().subscribe(() => {
            this.store.dispatch(
                new fromStore.CreateRecipe(this.originalRecipe)
            );
        });
    }
}
