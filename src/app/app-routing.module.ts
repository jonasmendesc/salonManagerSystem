import { Routes } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';

export const ROUTES: Routes = [
{ path: '', component: HomeComponent},
{ path: 'login', loadChildren: '../app/login/login.module#LoginModule' },
{ path: 'register', loadChildren: '../app/register/register.module#RegisterModule'}];
