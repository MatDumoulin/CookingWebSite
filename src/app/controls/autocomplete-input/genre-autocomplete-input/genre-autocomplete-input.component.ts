import { Component, OnInit, ElementRef, Renderer2, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutocompleteInput } from '../autocomplete-input.component'
import { GenresService } from '../../../recipes/genre/shared/genre.service';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'genre-autocomplete-input',
  templateUrl: '../autocomplete-input.component.html',
  styleUrls: ['../autocomplete-input.component.css'],
  providers: [
    {provide: MatFormFieldControl, useExisting: GenreAutocompleteInput},
    {provide: NG_VALUE_ACCESSOR,useExisting: forwardRef(() => GenreAutocompleteInput), multi: true}
  ]
})
export class GenreAutocompleteInput extends AutocompleteInput {

  private isLoading = false;
  private previousApiCall : Observable<string[]>;
  private genres: string[] = [];

  constructor(fm: FocusMonitor, elRef: ElementRef, renderer: Renderer2, private genresService: GenresService) {
    super(fm, elRef, renderer);
  }

  ngOnInit() {
    this.genresService.genres.subscribe(genres => {
      this.genres = genres;
      this.optionsGetter(); // Refreshing the list of options.
    });
  }

  optionsGetter() {
    this.options = this.genres.filter(g => g.indexOf(this.value) !== -1);
  }

}
