import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './store-state';
import { recipesEffects } from './recipes/effects';
import { authEffects } from './auth/effects';

// Data services
import { ApiGetRecipesService } from '../../recipes/shared/api-get-recipes.service';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('data', reducers),
        EffectsModule.forFeature(recipesEffects.concat(authEffects))
    ],
    providers: [
        ApiGetRecipesService
    ]
})
export class DataStoreModule { }
