import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginRoutes } from './login-routing-module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(LoginRoutes)
  ]
})
export class LoginModule { }
