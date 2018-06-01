import { NgModule } from "@angular/core";
import {
    StoreRouterConnectingModule,
    RouterStateSerializer
} from "@ngrx/router-store";

import { CustomSerializer } from "./router-store";

import { EditRecipeResolverService } from "./edit-recipe-resolver.service";

@NgModule({
    providers: [
        EditRecipeResolverService,
        { provide: RouterStateSerializer, useClass: CustomSerializer }
    ],
    exports: [
        // Syncs up the router store with the router.
        StoreRouterConnectingModule
    ]
})
export class RoutingModule {}
