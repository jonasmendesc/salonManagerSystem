import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloConfigModule } from '../apollo-config/apollo-config.module';

@NgModule({
  declarations: [],
  exports: [
    BrowserModule,
    ApolloConfigModule
  ]
})
export class CoreModule { }
