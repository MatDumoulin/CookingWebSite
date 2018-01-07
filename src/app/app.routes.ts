import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroPage } from './pages/intro-page/intro-page.component';
import { LoginPage } from './pages/login-page/login-page.component';
import { HomePage } from './pages/home-page/home-page.component';
import { RecipePage } from './pages/recipe-page/recipe-page.component';
import { AuthenticationGuard } from './core/authentication/auth-guard.service'

// Route Configuration
export const routes: Routes = [
  { path: '', component: IntroPage },
  { path: 'login', component: LoginPage },
  { path: 'home', component: HomePage, canActivate: [AuthenticationGuard] },
  { path: 'recipes', component: RecipePage, canActivate: [AuthenticationGuard] },
  { path: "**",redirectTo:""}
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
