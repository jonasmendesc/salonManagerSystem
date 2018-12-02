import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { Apollo } from 'apollo-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [ CoreModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
