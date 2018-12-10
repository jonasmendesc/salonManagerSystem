import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloConfigModule } from '../apollo-config/apollo-config.module';
import { OauthApplicationService } from '../core/oauth-application.service';
import { GenericRequestService } from './generic-request.service';
import { RegisterService } from './register.service';
import { LoginService } from './login.service';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';


@NgModule({
  declarations: [],
  exports: [
    BrowserModule,
    ApolloConfigModule,
    SocialLoginModule ],
    providers: [
      OauthApplicationService,
      GenericRequestService,
      RegisterService,
      LoginService,
      {
        provide: AuthServiceConfig,
        useFactory: () => new AuthServiceConfig([
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('215665592686119')
          }
        ])
      }
    ]
})
export class CoreModule { }
