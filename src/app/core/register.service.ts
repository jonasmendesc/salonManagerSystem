import { GenericRequestService } from './generic-request.service';
import { OauthApplicationService } from './oauth-application.service';
import { Injectable } from '@angular/core';
import { Register } from '../register/register/register.model';
import { TokenApplication } from './types';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  /**
   * Construtor para a inicializacao da instância
   * @param oauthService Service para autenticacao da aplicação
   * @param genericRequest  Serviço generico para fazer as requisicoes
   */
  constructor(private oauthService: OauthApplicationService,
              private genericRequest: GenericRequestService) { }

  /**
   * Register a empresa para a aplicacao
   * @param register Dados para registro
   */
  register(register: Register): void {
    const dateCurrent = new Date();
   if (this.oauthService.expiredToken(dateCurrent)) {
      const mutationToken = `mutation {
        createToken{ token,expiresIn }
      }`;
      this.genericRequest.mutation('oauth', mutationToken).subscribe(response => {
        const token: TokenApplication = response;
        this.oauthService.insertOrUpdateToken(token, dateCurrent);
        this.createCompany(register);
      }, error => console.log(error));
   } else {
        this.createCompany(register);
     }
  }

  /**
   * Inserir os dados da empresa
   * @param register Registro com os dados da empresa para cadastro
   */
  createCompany(register: Register): void {
    const mutation = `
       mutation createCompany($name: String!, $email: String!, $password: String!){
         createCompany(input: { name: $name,  password: $password},
           emails : [{ email: $email, isMain: true} ]){
           id
           name
           validateEmailCode
           licenseCode
           isActive
           createdAt
           companyEmails {
             id
             email
             isMain
             isActive
             isValidade
             createdAt
           }
         }
   }`;

    const variables = {
       name: register.companyName,
       email: register.email,
       password: register.password
    };

    this.genericRequest.mutationWithVariable('application', mutation, variables)
        .subscribe(responseApplication => console.log(responseApplication), error => console.log(error));
   }

}
