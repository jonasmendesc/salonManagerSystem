import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'ssm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sistema de salão';

  constructor(private apollo: Apollo) { this.createClientId(); }

  createClientId() {

   this.apollo.use('application').mutate({
     mutation: gql`mutation {
      createAuthorization( name: "Website Gerenciador" ){
        clientId
        clientSecret
        name
      }
    }`
   }).subscribe((response) => console.log('response', response));
  }
}


