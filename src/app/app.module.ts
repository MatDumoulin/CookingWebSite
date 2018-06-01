import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import 'hammerjs'; // To support gestures.
import { LocalStorageModule } from 'angular-2-local-storage'; // To access HTML5 LocalStorage's features
// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// Custom modules
import { RoutingModule } from './routing/routing.module';
import { routerReducers } from './routing/router-store';
import { PagesModule } from './pages/pages.module';
// Components
import { AppComponent } from './app.component';
import { TopNav } from './top-nav/top-nav.component';
import { SidenavContentComponent } from './sidenav-content/sidenav-content.component';
// Services
import { TokenInterceptor } from './core/authentication/auth-http-interceptor.service';
// Others
import { environment } from '../environments/environment';
import { routing } from './app.routes';


@NgModule({
    declarations: [
        AppComponent,
        TopNav,
        SidenavContentComponent
    ],
    imports: [
        HttpClientModule,
        RoutingModule,
        RouterModule,
        routing,
        PagesModule,
        LocalStorageModule.withConfig({
            prefix: 'mycookingbook',
            storageType: 'sessionStorage',
            notifyOptions: { setItem: true, removeItem: true }
        }),
        StoreModule.forRoot(routerReducers),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production // Restrict extension to log-only mode
        }),
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule { }
