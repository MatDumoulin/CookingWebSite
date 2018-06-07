import { Component, OnInit, OnDestroy } from "@angular/core";
import {
    MatDialog,
    MatSnackBar,
    MatSnackBarConfig,
    MatSnackBarRef,
    SimpleSnackBar
} from "@angular/material";
import { Router } from "@angular/router";
// moment
import * as moment from "moment";
// Ngrx Store
import { Store, ActionsSubject } from "@ngrx/store";
import * as fromStore from "../../core/store";
// Rxjs
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";
// Components
import { AdvancedRecipeSearchComponent } from "../../search/advanced-recipe-search/advanced-recipe-search.component";
// Rxjs
import { Observable } from "rxjs/Observable";
// Models
import { Recipe } from "./../shared/recipe.model";
// Services
import { LoggerService } from "../../core/logger/logger.service";
import { RecipesService } from "./../shared/recipes.service";
// Others
import { InfiniteScroll } from "./../shared/infinite-scroll.class";
import { RecipeListDataSource } from "./recipe-list.datasource";

@Component({
    selector: "mcb-recipe-list",
    templateUrl: "recipe-list.component.html",
    styleUrls: ["recipe-list.component.css"]
})
export class RecipeListComponent extends InfiniteScroll
    implements OnInit, OnDestroy {
    /**
     * the number is the scroll distance for which the loadMore function will
     * be called, in pixels.
     */
    static readonly LOADING_DISTANCE = 20;
    displayedColumns = ["name", "genre", "rating", "actions"];
    dataSource: RecipeListDataSource;
    private allDataIsLoaded = false;
    private hasShownAllDataIsLoaded = false;
    private canLoadMoreData$: Observable<boolean>;
    private subcriptions: Subscription[] = [];
    private searchSnackBarRef: MatSnackBarRef<SimpleSnackBar>;

    constructor(
        private actions$: ActionsSubject,
        private recipesService: RecipesService,
        private loggerService: LoggerService,
        private dialog: MatDialog,
        private router: Router,
        private snackbar: MatSnackBar,
        private store: Store<fromStore.DataState>
    ) {
        super(RecipeListComponent.LOADING_DISTANCE);
    }

    ngOnInit() {
        this.listenToStoreState();
        this.dataSource = new RecipeListDataSource(this.store);

        // When moving from one page to another using the Angular Router, the
        // recipeService is not reinitialized since it was injected to this class.
        // We don't want to load more recipe when we navigate from one page to another
        // but we want our table to display the proper recipes.
        if (!this.allDataIsLoaded) {
            this.loadMore();
        }
    }

    ngOnDestroy() {
        for (const sub of this.subcriptions) {
            sub.unsubscribe();
        }

        // Hide advanced search snack bar if we are leaving the page.
        if (this.searchSnackBarRef) {
            this.searchSnackBarRef.instance.action(); // Cancels the search.
        }
    }

    viewRecipe(recipeId: string): void {
        this.router.navigateByUrl("/recipes/" + recipeId);
    }

    editRecipe(recipeId: string, clickEvent: Event): void {
        clickEvent.stopPropagation(); // This is needed due to a bug introduced in first stable version of Angular Material. (5.0.0-rc0)
    }

    advancedSearch(): void {
        this.dialog
            .open(AdvancedRecipeSearchComponent)
            .afterClosed()
            .subscribe(response => {
                // Ignoring when the user cancels the advanced search.
                if (response) {
                    this.store.dispatch(new fromStore.SearchRecipes(response));
                    this.displaySearchCancelOption();
                }
            });
    }

    displaySearchCancelOption(): void {
        const config = new MatSnackBarConfig();
        config.horizontalPosition = "right";
        config.panelClass = "no-margin-bottom";

        this.searchSnackBarRef = this.loggerService.persistentAction(
            "Une recherche est active."
        );

        this.searchSnackBarRef.onAction().subscribe(() => {
            this.store.dispatch(new fromStore.CancelSearchRecipes());
            this.searchSnackBarRef = null;
        });
    }

    /**
     * Loads more recipe into the list.
     */
    loadMore(): Promise<any> {
        // If we can still load more resources
        if (!this.allDataIsLoaded) {
            this.store.dispatch(new fromStore.LoadRecipes());
            return this.canLoadMoreData$.pipe(take(1)).toPromise();
        } else if (!this.hasShownAllDataIsLoaded) {
            this.allDataIsLoaded = true;
            this.hasShownAllDataIsLoaded = true;
            this.showAllDataIsLoadedMessage();
        }

        // Else,
        return Promise.resolve();
    }

    private listenToStoreState(): void {
        this.canLoadMoreData$ = this.store.select(
            fromStore.getCanLoadMoreRecipes
        );

        this.subcriptions.push(
            this.canLoadMoreData$.subscribe(
                canLoadMore => (this.allDataIsLoaded = !canLoadMore)
            )
        );
    }

    private showAllDataIsLoadedMessage() {
        // There are no actions for this snackbar since it displays only an
        // information message. It is frustrating to the user if he tries to close
        // this snackbar but the snackbar closes automatically beforehand.
        this.loggerService.info("Toutes les recettes ont été chargées.", "");
    }
}
