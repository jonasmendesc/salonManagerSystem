import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenApplication, CompanyToken } from './types';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class OauthApplicationService {

  constructor() { }

  /**
   * Verifica se token expirou
   * @param dateCurrent Data corrente
   */
  expiredToken(dateCurrent: Date): boolean {
    const accessToken: string = localStorage.getItem(environment.accessKeyTokenApplication);
    if (accessToken) {
      const tokenApplication: TokenApplication = this.decrypt<TokenApplication>(accessToken);
      return dateCurrent > new Date(tokenApplication.dueDate);
    }
   return true;
  }

  /**
   * inserir ou atualizar o token no local storage
   * @param token token da aplicacao
   * @param dateCurrent Data corrente
   */
  insertOrUpdateToken(token: TokenApplication, dateCurrent: Date): void {
    const auxDate = new Date(dateCurrent);
    auxDate.setSeconds(auxDate.getSeconds() + (token.data.createToken.expiresIn - 360));
    token.dueDate = auxDate.toString();
    localStorage.setItem(environment.accessKeyTokenApplication, this.encrypt(token));
  }

  /**
   * Inserir ou atualizar o token
   * @param companyToken Token da empresa
   * @param dateCurrent Data corrente
   */
  insertOrUpdateCompanyToken(companyToken: CompanyToken, dateCurrent: Date): void {
    const auxDate = new Date(dateCurrent);
    auxDate.setSeconds(auxDate.getSeconds() + (companyToken.data.createTokenCompany.expiresIn - 360));
    companyToken.dueDate = auxDate.toString();
    sessionStorage.setItem(environment.accessKeyTokenCompany, this.encrypt(companyToken));
  }

  /**
   * Verfica se o token da empresa já expirou
   * @param dateCurrent Data corrente
   */
  expiredCompanyToken(dateCurrent: Date) {
    const accessToken: string = localStorage.getItem(environment.accessKeyTokenCompany);
    if (accessToken) {
      const companyToken: CompanyToken = this.decrypt<CompanyToken>(accessToken);
      return dateCurrent > new Date(companyToken.dueDate);
    }
   return true;
  }

  /**
   * Encriptador dp dados
   * @param data Dados para serem criptografado
   */
  private encrypt(data: any): string {

    const tokenString = JSON.stringify(data);
    const ciphertext = crypto.AES.encrypt(tokenString, environment.accessKeyCrypto);
    return ciphertext.toString();

  }

  /**
   * Retorna os dados no formato UTF-8
   * @param data Dados cryptografado
   */
  private decrypt<T>(data: string): T {

    const bytes = crypto.AES.decrypt(data, environment.accessKeyCrypto);
    return JSON.parse(bytes.toString(crypto.enc.Utf8));

  }

}
