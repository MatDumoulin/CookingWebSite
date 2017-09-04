import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './pages/home-page/home-page.component';
import { RecipePage } from './pages/recipe-page/recipe-page.component';

// Route Configuration
export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'recipes', component: RecipePage }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
