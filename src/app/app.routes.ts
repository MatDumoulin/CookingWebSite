import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroPage } from './pages/intro-page/intro-page.component';
import { LoginPage } from './pages/login-page/login-page.component';
import { HomePage } from './pages/home-page/home-page.component';
import { RecipePage } from './pages/recipe-page/recipe-page.component';

// Route Configuration
export const routes: Routes = [
  { path: '', component: IntroPage },
  { path: 'login', component: LoginPage },
  { path: 'home', component: HomePage },
  { path: 'recipes', component: RecipePage },
  { path: "**",redirectTo:""}
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
