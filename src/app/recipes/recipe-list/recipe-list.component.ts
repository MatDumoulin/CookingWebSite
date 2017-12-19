import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { Recipe } from './../shared/recipe.model';
import { RecipesService } from './../shared/recipes.service';
import { RecipeListDataSource } from './recipe-list.datasource';
import { RecipeViewer } from './../recipe-viewer/recipe-viewer.component';
import { RecipeCreator } from './../recipe-creator/recipe-creator.component';
import { AdvancedRecipeSearchComponent } from '../../search/advanced-recipe-search/advanced-recipe-search.component';
import { InfiniteScroll } from './../shared/infinite-scroll.class';


@Component({
  selector: 'recipe-list',
  templateUrl: 'recipe-list.html',
  styleUrls: ['recipe-list.css']
})
export class RecipeList extends InfiniteScroll {
  displayedColumns = ['name', 'genre', 'rating', 'actions'];
  dataSource: RecipeListDataSource;
  private hasDisplayedCantLoadMore = false;

  constructor(private recipesService:RecipesService, private dialog: MatDialog,
              private snackbar: MatSnackBar) {
    super(10); // the number is the scroll distance for which the loadMore function will
               // be called, in pixels.
  }

  ngOnInit() {
    this.dataSource = new RecipeListDataSource(this.recipesService);

    // When moving from one page to another using the Angular Router, the
    // recipeService is not reinitialized since it was injected to this class.
    // We don't want to load more recipe when we navigate from one page to another
    // but we want our mat-table to display the proper recipes.
    if(this.recipesService.data.length === 0) {
      this.loadMore();
    }
  }

  viewRecipe(recipeId:string): void {
    this.dialog.open(RecipeViewer, { data: {recipeId}});
  }

  createRecipe(): void {
    this.dialog.open(RecipeCreator);
  }

  editRecipe(recipeId:string, clickEvent:Event) : void {
    this.dialog.open(RecipeCreator, { data: {recipeId}});
    clickEvent.stopPropagation(); // This is needed due to a bug introduced in first stable version of Angular Material. (5.0.0-rc0)
  }

  advancedSearch():void {
    this.dialog.open(AdvancedRecipeSearchComponent)
               .afterClosed()
               .subscribe(response => {
                 // Ignoring when the user cancels the advanced search.
                 if(response) {
                   this.recipesService.loadFromAdvancedSearch(response);
                   this.hasDisplayedCantLoadMore = false;
                   this.displaySearchCancelOption();
                 }
               });
  }

  displaySearchCancelOption():void {
    let config = new MatSnackBarConfig();
    config.horizontalPosition = "right";
    config.extraClasses = "no-margin-bottom";

    let snackBarRef = this.snackbar.open("Une recherche est active.", "Annuler", config);
    snackBarRef.onAction().subscribe(() => {
      this.recipesService.cancelSearch();
      this.loadMore();
    });
  }

  loadMore() {
    this.recipesService.loadMoreRecipes()
                       .then(canLoadMore => this.loadingHasFinished(canLoadMore));
  }

  private loadingHasFinished(canLoadMore:boolean) {
    if(!canLoadMore && !this.hasDisplayedCantLoadMore) {
      this.hasDisplayedCantLoadMore = true;
      // There are no actions for this snackbar since it displays only an
      // information message. I found that it is frustrating to the user
      // if he tries to close this snackbar but the snackbar closes automatically
      // beforehand.
      let snackBarRef = this.snackbar.open("Toutes les recettes ont été chargées.", "", {
                          duration: 2000,
                        });

      snackBarRef.afterDismissed().subscribe(() => {
        if(this.recipesService.searchIsActive()) {
          this.displaySearchCancelOption();
        }
      });

    }
  }
}
