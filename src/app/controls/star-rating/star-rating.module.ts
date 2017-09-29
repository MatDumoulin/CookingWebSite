import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRating } from './star-rating.component';

@NgModule({
  declarations: [
    StarRating
  ],
  imports: [ CommonModule ],
  providers: [],
  exports: [ StarRating ]
})
export class StarRatingModule { }
