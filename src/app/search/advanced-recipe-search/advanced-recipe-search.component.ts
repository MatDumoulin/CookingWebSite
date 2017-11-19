import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Genres } from '../../recipes/genre/shared/genre.service';

@Component({
  selector: 'app-advanced-recipe-search',
  templateUrl: './advanced-recipe-search.component.html',
  styleUrls: ['./advanced-recipe-search.component.css']
})
export class AdvancedRecipeSearchComponent implements OnInit {
  private searchCriteria = {
      name: "",
      ingredients: [],
      genre: "",
      rating: 0,
      totalTime: 0,
      wantsName: false,
      wantsGenre: false,
      wantsRating: false,
      wantsTotalTime: false
    };

  private GENRES = Genres.get();

  constructor(private dialogRef: MatDialogRef<AdvancedRecipeSearchComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
