import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ROUTES } from './app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [ CoreModule, RouterModule.forRoot(ROUTES) ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
