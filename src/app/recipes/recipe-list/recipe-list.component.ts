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
    super();
  }

  ngOnInit() {
    this.dataSource = new RecipeListDataSource(this.recipesService);
    this.loadMore();
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
