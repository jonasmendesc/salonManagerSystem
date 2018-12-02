import { NgModule } from '@angular/core';
import { HttpLinkModule, HttpLink  } from 'apollo-angular-link-http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from 'src/environments/environment';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
/**
 * Classe para a configuracao do client apollo-angular
 */
export class ApolloConfigModule {

  /**
   * Construtor para a configuracao do apollo client
   * @param apollo Client para requisições para a api do graphql
   * @param httpLink Objeto de link para as uris do graphql
   */
  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    const linkError = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    });

    apollo.createDefault(
      { link: ApolloLink.from(
        [ linkError,
          httpLink.create({ uri: environment.BusinessManagerUrl })
        ]), cache : new InMemoryCache(), connectToDevTools: !environment.production});

    apollo.createNamed('application',
      { link: ApolloLink.from(
        [ linkError,
          httpLink.create({ uri: environment.applicationUrl })
        ]), cache : new InMemoryCache(), connectToDevTools: !environment.production});

    apollo.createNamed('oauth',
    { link: ApolloLink.from(
      [ linkError,
        httpLink.create({ uri: environment.oAuthUrl })
      ]), cache : new InMemoryCache(), connectToDevTools: !environment.production});
  }

}
