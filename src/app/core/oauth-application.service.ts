import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { environment } from 'src/environments/environment';
import { TokenApplication } from './types';

@Injectable({
  providedIn: 'root'
})
export class OauthApplicationService {

  constructor(private apollo: Apollo) { }

  expiredToken(dateCurrent: Date): boolean {
    const accessToken: string = localStorage.getItem(environment.accessKeyTokenApplication);
    if (accessToken) {
      const tokenApplication: TokenApplication = JSON.parse(accessToken);
      return dateCurrent > new Date(tokenApplication.dueDate);
    }
   return true;
  }

  insertOrUpdateToken(token: TokenApplication, dateCurrent: Date): void {
    const auxDate = new Date(dateCurrent);
    auxDate.setSeconds(auxDate.getSeconds() + 60);
    token.dueDate = auxDate.toString();
    localStorage.setItem(environment.accessKeyTokenApplication, JSON.stringify(token));
  }

  /* findAndRefreshToken() {
   const dateCurrent = new Date();
   const accessToken: string = localStorage.getItem(environment.accessKeyTokenApplication);
   if (accessToken == null || accessToken === undefined) {
    this.restResquest(dateCurrent);
   } else {
    const tokenApplication: TokenApplication = JSON.parse(accessToken);
    if (dateCurrent > new Date(tokenApplication.dueDate)) {
      this.restResquest(dateCurrent);
    }
   }

  }*/

  /*private restResquest(dateCurrent) {
     this.apollo.use('oauth').mutate({
      mutation: gql`mutation {
        createToken{ token,expiresIn }
      }`
    }).subscribe(response => {
      const token: TokenApplication = response;
      const auxDate = new Date(dateCurrent);
      auxDate.setSeconds(auxDate.getSeconds() + 60);
      token.dueDate = auxDate.toString();
      localStorage.setItem(environment.accessKeyTokenApplication, JSON.stringify(token));
    }, error => console.log(error));

  }*/

}
