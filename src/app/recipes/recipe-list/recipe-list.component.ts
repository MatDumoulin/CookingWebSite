import { Component, OnInit } from '@angular/core';
import { Recipe } from './../shared/recipe.model';
import { RecipesService } from './../shared/recipes.service';
import { RecipeListDataSource } from './recipe-list.datasource';

@Component({
  selector: 'recipe-list',
  templateUrl: 'recipe-list.html',
  styleUrls: ['recipe-list.css']
})
export class RecipeList{
  title = 'app';
  displayedColumns = ['name', 'genre', 'rating'];
  recipes: Recipe[] = [];
  dataSource: RecipeListDataSource;

  constructor(private recipesService:RecipesService) {

  }

  ngOnInit() {
    this.dataSource = new RecipeListDataSource(this.recipesService);
    this.recipesService.loadMoreRecipes()
                       .then( recipes => this.recipes = recipes );
  }
}
