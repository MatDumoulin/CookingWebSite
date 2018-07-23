import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ElementRef,
    HostListener,
    AfterViewInit
} from "@angular/core";
import {
    MatDialog,
    MatSnackBar,
    MatSnackBarConfig,
    MatSnackBarRef,
    SimpleSnackBar
} from "@angular/material";
import { Router } from "@angular/router";
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
import { Recipe } from "../../recipes/shared/recipe.model";
// Services
import { LoggerService } from "../../core/logger/logger.service";
// Others
import { InfiniteScroll } from "../../recipes/shared/infinite-scroll.class";
import { RecipeListDataSource } from "../../recipes/recipe-list/recipe-list.datasource";

@Component({
    selector: "mcb-recipe-grid",
    templateUrl: "./recipe-grid.component.html",
    styleUrls: ["./recipe-grid.component.css"]
})
export class RecipeGridComponent extends InfiniteScroll
    implements OnInit, AfterViewInit, OnDestroy {
    /**
     * the number is the scroll distance for which the loadMore function will
     * be called, in pixels.
     */
    static readonly LOADING_DISTANCE = 20;
    defaultImage = Recipe.DEFAULT_IMAGE;
    // Layout management
    columns = [];
    numberOfColumn = 4;
    colWidth = 200; /** In pixels */
    readonly gutterSize = 16;
    private gridWidth: number; /** In pixels */
    private hasLoadedView = false;
    @ViewChild("grid") gridElement: ElementRef<HTMLDivElement>;
    // Data management
    dataSource: RecipeListDataSource;
    recipes$: Observable<Recipe[]>;
    recipes: Recipe[] = [];
    private allDataIsLoaded = false;
    private hasShownAllDataIsLoaded = false;
    private canLoadMoreData$: Observable<boolean>;
    private subcriptions: Subscription[] = [];
    private searchSnackBarRef: MatSnackBarRef<SimpleSnackBar>;

    constructor(
        private actions$: ActionsSubject,
        private loggerService: LoggerService,
        private dialog: MatDialog,
        private router: Router,
        private snackbar: MatSnackBar,
        private store: Store<fromStore.DataState>
    ) {
        super(RecipeGridComponent.LOADING_DISTANCE);
    }

    ngOnInit() {
        this.listenToStoreState();
        this.dataSource = new RecipeListDataSource(this.store);
        this.recipes$ = this.dataSource.connect();

        this.subcriptions.push(
            this.recipes$.subscribe(recipes => {
                this.recipes = recipes;
                // This if prevents the view from being rendered twice in a row.
                if (this.hasLoadedView) {
                    this.updateGridDisplay();
                }
            })
        );

        // When moving from one page to another using the Angular Router, the
        // recipeService is not reinitialized since it was injected to this class.
        // We don't want to load more recipe when we navigate from one page to another
        // but we want our table to display the proper recipes.
        if (!this.allDataIsLoaded) {
            this.loadMore();
        }
    }

    ngAfterViewInit() {
        this.hasLoadedView = true;
        setTimeout( () => this.formatRecipesForDisplay());
    }

    ngOnDestroy() {
        this.dataSource.disconnect();
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

    editRecipe(recipeId: string): void {
        this.router.navigateByUrl("/recipe/edit/" + recipeId);
    }

    deleteRecipe(recipeId: string): void {
        this.store.dispatch(new fromStore.DeleteRecipe(recipeId));
    }

    stopPropagation(event: MouseEvent) {
        event.stopPropagation();
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

    private formatRecipesForDisplay(): void {
        if (!this.gridElement) {
            return;
        }

        this.gridWidth = this.gridElement.nativeElement.offsetWidth;
        const currentGridWidth = this.gridWidth;
        // Take all space available if the current col width is invalid.
        const currentColWidth = this.colWidth;
        const newNumberOfColumn = Math.floor(
            currentGridWidth / (currentColWidth + this.gutterSize)
        );

        if (this.numberOfColumn !== newNumberOfColumn) {
            this.numberOfColumn = newNumberOfColumn;
            this.updateGridDisplay();
        }
    }

    private updateGridDisplay(): void {
        this.columns = [];
        // Setting up the columns to empty array.
        for (let i = 0; i < this.numberOfColumn; ++i) {
            this.columns.push([]);
        }

        // Then, filling these array with recipes.
        for (let col = 0; col < this.numberOfColumn; ++col) {
            for (let i = col; i < this.recipes.length; i += this.numberOfColumn) {
                this.columns[col].push(this.recipes[i]);
            }
        }
    }

    private showAllDataIsLoadedMessage(): void {
        // There are no actions for this snackbar since it displays only an
        // information message. It is frustrating to the user if he tries to close
        // this snackbar but the snackbar closes automatically beforehand.
        this.loggerService.info("Toutes les recettes ont été chargées.", "");
    }

    ////////////////// Grid responsive layout management /////////////////////

    @HostListener("window:resize")
    onComponentResize() {
        // this._gridWidth = width;
        this.resizeThrottler(this.formatRecipesForDisplay.bind(this));
    }

    private resizeTimeout; // Used to trottle the grid resize event.
    resizeThrottler(callback: Function) {
        // ignore resize events as long as an actualResizeHandler execution is in the queue
        if (!this.resizeTimeout) {
            this.resizeTimeout = setTimeout(() => {
                this.resizeTimeout = null;
                callback();

                // The actualResizeHandler will execute at a rate of 15fps
            }, 66);
        }
    }
}
