import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './recipes/reducers';
import { effects } from './recipes/effects';

// Data services
import { ApiGetRecipesService } from '../../recipes/shared/api-get-recipes.service';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('data', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ApiGetRecipesService
    ]
})
export class DataStoreModule { }
