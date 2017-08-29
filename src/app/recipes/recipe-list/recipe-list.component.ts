import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { Recipe } from './../shared/recipe.model';
import { RecipesService } from './../shared/recipes.service';
import { RecipeListDataSource } from './recipe-list.datasource';
import { RecipeViewer } from './../recipe-viewer/recipe-viewer.component';


@Component({
  selector: 'recipe-list',
  templateUrl: 'recipe-list.html',
  styleUrls: ['recipe-list.css']
})
export class RecipeList{
  displayedColumns = ['name', 'genre', 'rating'];
  recipes: Recipe[] = [];
  dataSource: RecipeListDataSource;

  constructor(private recipesService:RecipesService, private dialog: MdDialog) {

  }

  ngOnInit() {
    this.dataSource = new RecipeListDataSource(this.recipesService);
    this.recipesService.loadMoreRecipes()
                       .then( recipes => this.recipes = recipes );
  }

  viewRecipe(recipeId:string): void {
    this.dialog.open(RecipeViewer, { data: {recipeId}});
  }
}
