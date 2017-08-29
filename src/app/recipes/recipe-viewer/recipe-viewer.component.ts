import { Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';

import { Recipe } from './../shared/recipe.model';
import { ApiSpecificRecipeService } from './../shared/api-specific-recipe.service';

@Component({
  selector: 'recipe-viewer',
  templateUrl: 'recipe-viewer.html',
  styleUrls: ['recipe-viewer.css']
})
export class RecipeViewer{
  recipe: Recipe = new Recipe();

  constructor(private apiSpecificRecipeService:ApiSpecificRecipeService,
              @Inject(MD_DIALOG_DATA) private data: any) {}

  ngOnInit() {
    this.apiSpecificRecipeService.getRecipe(this.data.recipeId)
                       .subscribe( recipe => this.recipe = recipe );
  }
}

/*
(function() {
  angular.module('app.recipes')
         .controller('viewRecipeCtrl', viewRecipeCtrl);

  viewRecipeCtrl.$inject = ['$http', '$uibModalInstance', 'apiRecipeService', 'idOfRecipeToView', 'Recipe'];

  function viewRecipeCtrl($http, $uibModalInstance, apiRecipeService, idOfRecipeToView, Recipe) {
    var scope = this;
    scope.showContent = false;
    scope.recipe = new Recipe();

    apiRecipeService.getRecipe(idOfRecipeToView).then( function(recipe) {
      scope.recipe.setRecipe(recipe);
      scope.showContent = true;
    });

    scope.closeModal = function() {
      $uibModalInstance.close();
    };

    scope.convertToTime = function(minutes) {
      var converter = new MinutesToMinutesHoursConverter(minutes);

      return converter.getTime();
    }
  }

})();*/
