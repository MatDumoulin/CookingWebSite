import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page.component';
import { HomePage } from './pages/home-page/home-page.component';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';
import { RecipeCreatorComponent } from './pages/recipe-creator/recipe-creator.component';
import { AuthenticationGuard } from './core/authentication/auth-guard.service';

// Route Configuration
export const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: 'full' },
    { path: 'login', component: LoginPage },
    { path: 'home', component: HomePage, canActivate: [AuthenticationGuard] },
    { path: 'recipes', component: RecipePageComponent, canActivate: [AuthenticationGuard] },
    { path: 'recipe/create', component: RecipeCreatorComponent, canActivate: [AuthenticationGuard] },
    { path: "**", redirectTo: "" }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
