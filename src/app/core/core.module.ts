import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloConfigModule } from '../apollo-config/apollo-config.module';
import { OauthApplicationService } from '../core/oauth-application.service';
import { GenericRequestService } from './generic-request.service';

@NgModule({
  declarations: [],
  exports: [
    BrowserModule,
    ApolloConfigModule ],
    providers: [OauthApplicationService, GenericRequestService]
})
export class CoreModule { }
