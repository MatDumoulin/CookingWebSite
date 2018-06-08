import { NgModule } from "@angular/core";
import {
    StoreRouterConnectingModule,
    RouterStateSerializer
} from "@ngrx/router-store";

import { CustomSerializer } from "./router-store";

import { LoadRecipeResolverService } from "./load-recipe-resolver.service";

@NgModule({
    providers: [
        LoadRecipeResolverService,
        { provide: RouterStateSerializer, useClass: CustomSerializer }
    ],
    exports: [
        // Syncs up the router store with the router.
        StoreRouterConnectingModule
    ]
})
export class RoutingModule {}
