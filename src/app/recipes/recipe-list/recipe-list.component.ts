import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog, MatSnackBar, MatSnackBarConfig } from "@angular/material";
// moment
import * as moment from "moment";
// Ngrx Store
import { Store, ActionsSubject } from "@ngrx/store";
import * as fromStore from "../../core/store";
// Rxjs
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";
// Components
import { RecipeViewer } from "./../recipe-viewer/recipe-viewer.component";
/* import { RecipeCreator } from './../recipe-creator/recipe-creator.component'; */
import { AdvancedRecipeSearchComponent } from "../../search/advanced-recipe-search/advanced-recipe-search.component";
// Rxjs
import { Observable } from "rxjs/Observable";
// Models
import { Recipe } from "./../shared/recipe.model";
// Services
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

    constructor(
        private actions$: ActionsSubject,
        private recipesService: RecipesService,
        private dialog: MatDialog,
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
    }

    viewRecipe(recipeId: string): void {
        this.dialog.open(RecipeViewer, { data: { recipeId } });
    }

    editRecipe(recipeId: string, clickEvent: Event): void {
        /* this.dialog.open(RecipeCreator, { data: { recipeId } }); */
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

        const snackBarRef = this.snackbar.open(
            "Une recherche est active.",
            "Annuler",
            config
        );
        snackBarRef.onAction().subscribe(() => {
            this.store.dispatch(new fromStore.CancelSearchRecipes());
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
        }
        else if (!this.hasShownAllDataIsLoaded) {
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
            this.canLoadMoreData$.subscribe(canLoadMore =>
                this.allDataIsLoaded = !canLoadMore
            )
        );
    }

    private showAllDataIsLoadedMessage() {
            // There are no actions for this snackbar since it displays only an
            // information message. It is frustrating to the user if he tries to close
            // this snackbar but the snackbar closes automatically beforehand.
            const snackBarRef = this.snackbar.open(
                "Toutes les recettes ont été chargées.",
                "",
                {
                    duration: 2000
                }
            );

            // Showing the option to close the search if one is active.
            snackBarRef.afterDismissed().subscribe(() => {
                if (this.recipesService.searchIsActive()) {
                    this.displaySearchCancelOption();
                }
            });
    }
}
