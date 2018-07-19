import {
    Component,
    OnInit,
    ElementRef,
    Renderer2,
    forwardRef
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { AutocompleteInput } from "../autocomplete-input.component";
import { ApiGetRecipesService } from "../../../recipes/shared/api-get-recipes.service";
import { MatFormFieldControl } from "@angular/material/form-field";
import { FocusMonitor } from "@angular/cdk/a11y";
import { Observable } from "rxjs/Observable";

@Component({
    selector: "recipename-autocomplete-input",
    templateUrl: "../autocomplete-input.component.html",
    styleUrls: ["../autocomplete-input.component.css"],
    providers: [
        {
            provide: MatFormFieldControl,
            useExisting: RecipenameAutocompleteInput
        },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RecipenameAutocompleteInput),
            multi: true
        }
    ]
})
export class RecipenameAutocompleteInput extends AutocompleteInput {
    private isLoading = false;
    private previousApiCall: Observable<string[]>;

    constructor(
        fm: FocusMonitor,
        elRef: ElementRef,
        renderer: Renderer2,
        private recipesAPI: ApiGetRecipesService
    ) {
        super(fm, elRef, renderer);
    }

    ngOnInit() {}

    optionsGetter() {
        if (!this.value) {
            this.options = [];
        } else {
            this.recipesAPI
                .getMatchingRecipeNames(this.value)
                .subscribe(recipes => {
                    this.options = recipes;
                });
        }
    }
}
