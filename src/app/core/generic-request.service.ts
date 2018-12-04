import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Classe generica para fazer as requisicoes
 */
export class GenericRequestService {

  constructor(private apollo: Apollo) { }

  /**
   * Executada a mutation
   * @param name Nome do recurso
   * @param mutation Mutation a ser executada
   */
  mutation(name: string = '', mutation: string): Observable<any> {
    // Executa o refresh ou insere o token da aplicacao
    return name !== '' ? this.apollo.use(name).mutate({
      mutation: gql`${mutation}`
    }) : this.apollo.mutate({
      mutation: gql`${mutation}`,
    }) ;
  }

  /**
   * @param name Executa as mutations com varibales
   * @param mutation String com os dados da mutation
   * @param variables Variavíes para a mutation
   */
  mutationWithVariable(name: string = '', mutation: string, variables: any): Observable<any> {
    // Executa o refresh ou insere o token da aplicacao
    return name !== '' ? this.apollo.use(name).mutate({
      mutation: gql`${mutation}`, variables : variables
    }) : this.apollo.mutate({
      mutation: gql`${mutation}`, variables: variables
    }) ;
  }

}
