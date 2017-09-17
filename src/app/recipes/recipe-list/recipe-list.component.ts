import { Component, OnInit } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';

import { Recipe } from './../shared/recipe.model';
import { RecipesService } from './../shared/recipes.service';
import { RecipeListDataSource } from './recipe-list.datasource';
import { RecipeViewer } from './../recipe-viewer/recipe-viewer.component';
import { RecipeCreator } from './../recipe-creator/recipe-creator.component';
import { InfiniteScroll } from './../shared/infinite-scroll.class';


@Component({
  selector: 'recipe-list',
  templateUrl: 'recipe-list.html',
  styleUrls: ['recipe-list.css']
})
export class RecipeList extends InfiniteScroll {
  displayedColumns = ['name', 'genre', 'rating'];
  dataSource: RecipeListDataSource;
  private hasDisplayedCantLoadMore = false;

  constructor(private recipesService:RecipesService, private dialog: MdDialog,
              private snackbar: MdSnackBar) {
    super(10); // 5 is the scroll distance for which the loadMore function will
               // be called, in pixels.
  }

  ngOnInit() {
    this.dataSource = new RecipeListDataSource(this.recipesService);

    // When moving from one page to another using the Angular Router, the
    // recipeService is not reinitialized since it was injected to this class.
    // We don't want to load more recipe when we navigate from one page to another
    // but we want our md-table to display the proper recipes.
    if(this.recipesService.data.length === 0) {
      this.loadMore();
    }                                                               // TODO: As of angular material 2.0.0-beta.8, there is a bug with the
                                                                                  //       md-table and the router-outlet that prevents .
                                                                                  //       See: https://github.com/angular/material2/issues/5593
  }

  viewRecipe(recipeId:string): void {
    this.dialog.open(RecipeViewer, { data: {recipeId}});
  }

  createRecipe(): void {
    this.dialog.open(RecipeCreator);
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
      this.snackbar.open("Toutes les recettes ont été chargées.", "", {
        duration: 2000,
      });
    }
  }
}
