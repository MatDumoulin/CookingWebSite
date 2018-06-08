import { Injectable } from "@angular/core";
// Ngrx
import { Store } from "@ngrx/store";
import { Actions, Effect } from "@ngrx/effects";
import * as recipesActions from "../actions/recipes.action";
import * as fromReducers from "../reducers";
// Rxjs
import { switchMap } from "rxjs/operators";
// Services
import { LoggerService } from "../../../logger/logger.service";
import { empty } from "rxjs";

@Injectable()
export class ErrorHandlingEffects {
    constructor(
        private actions$: Actions,
        private loggerService: LoggerService
    ) {}

    @Effect()
    recipeErrors$ = this.actions$
        .ofType(
            recipesActions.LOAD_RECIPES_FAIL,
            recipesActions.CREATE_RECIPE_FAIL,
            recipesActions.UPDATE_RECIPE_FAIL,
            recipesActions.DELETE_RECIPE_FAIL
        )
        .pipe(
            switchMap(error => {
                this.loggerService.error(
                    "Impossible de communiquer avec le serveur",
                    "Ok"
                );
                return empty();
            })
        );
}
