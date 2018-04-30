import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteInputModule } from './autocomplete-input/autocomplete-input.module';
import { CustomListBoxModule } from './custom-listbox/custom-listbox.module';
import { StarRatingModule } from './star-rating/star-rating.module';
import { TimeInputModule } from './time-input/time-input.module';
import { TimeInputMomentModule } from './time-input-moment/time-input-moment.module';


@NgModule({
    declarations: [],
    imports: [],
    providers: [],
    exports: [
        CommonModule,
        AutocompleteInputModule,
        CustomListBoxModule,
        StarRatingModule,
        TimeInputModule,
        TimeInputMomentModule
    ]
})
export class ControlsModule { }
