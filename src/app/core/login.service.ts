import { Injectable } from '@angular/core';
import { OauthApplicationService } from './oauth-application.service';
import { GenericRequestService } from './generic-request.service';
import { Login } from '../login/login/login.model';
import { TokenApplication, CompanyToken } from './types';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /**
   * Construtor para a inicilização da instância
   * @param oauthService Servico de autenticação
   * @param genericRequest Serviço para envio de requesições
   */
  constructor(private oauthService: OauthApplicationService,
              private genericRequest: GenericRequestService) { }

  /**
   * Autenticação da empresa
   * @param login Dados do login
   */
  singUp(login: Login): void {
    const dateCurrent = new Date();
    if (this.oauthService.expiredCompanyToken(dateCurrent)) {
       const mutationToken = `mutation {
         createToken{ token,expiresIn }
       }`;
       this.genericRequest.mutation('oauth', mutationToken).subscribe(response => {
         const token: TokenApplication = response;
         this.oauthService.insertOrUpdateToken(token, dateCurrent);
         this.createToken(login);
       }, error => console.log(error));
    } else {
         this.createToken(login);
      }

  }
  /**
   * Cria o token da empresa dentro de uma se
   * @param login Dados de login
   */
  private createToken(login: Login): void {
    const mutation = `
      mutation createTokenCompany($email: String!, $password: String!){
        createTokenCompany(email: $email, password: $password) {
          token
          expiresIn
        }
      }
    `;
    const variables = {
      email: login.email,
      password: login.password
    };
    this.genericRequest.mutationWithVariable('application', mutation, variables)
      .subscribe(response => {
       const companyToken: CompanyToken = response;
       companyToken.login = login;
        this.oauthService.insertOrUpdateCompanyToken(companyToken, new Date());
      }, error => console.log(error));
  }
}
