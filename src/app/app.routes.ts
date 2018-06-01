import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';
import { RecipeCreatorComponent } from './pages/recipe-creator/recipe-creator.component';
import { AuthenticationGuard } from './core/authentication/auth-guard.service';
import { EditRecipeResolverService } from './routing/edit-recipe-resolver.service';

// Route Configuration
export const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent },
    { path: 'home', component: HomePageComponent, canActivate: [AuthenticationGuard] },
    { path: 'recipes', component: RecipePageComponent, canActivate: [AuthenticationGuard] },
    { path: 'recipe/create', component: RecipeCreatorComponent, canActivate: [AuthenticationGuard] },
    {
        path: 'recipe/edit/:id',
        component: RecipeCreatorComponent,
        canActivate: [AuthenticationGuard],
        resolve: { recipe: EditRecipeResolverService }
    },
    { path: "**", redirectTo: "" }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
