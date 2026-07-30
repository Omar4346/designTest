import { Routes } from '@angular/router';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: Login}
];

/*
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  // Redirect the default root path to your new preferred page
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  
  // Define your pages
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent }
];
*/