import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { GenericRequestService } from 'src/app/core/generic-request.service';
import { OauthApplicationService } from 'src/app/core/oauth-application.service';
import { TokenApplication } from 'src/app/core/types';

@Component({
  selector: 'ssm-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private genericRequestService: GenericRequestService,
              private oauthAppilicationService: OauthApplicationService) { }

  registerForm: FormGroup;
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  /**
   * Verifica se o email e confirmação do email são iguais
   * @param group Group do formulario
   */
  static equalsto(group: AbstractControl): { [key: string]: boolean } {
    const password = group.get('password');
    const passwordConfirmation = group.get('passwordConfirmation');
    if (!password || !passwordConfirmation) {
      return undefined;
    }
    if (password.value !== passwordConfirmation.value) {
      return {passwordNotMatch: true};
    }
    return undefined;
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
    companyName: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
    email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: this.formBuilder.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]),
    passwordConfirmation : this.formBuilder.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(12)])
  });

  }
  /**
   * Evento do click do botão para criar a empresa
   */
  clickEventHandler() {
   const dateCurrent = new Date();
   if (this.oauthAppilicationService.expiredToken(dateCurrent)) {
      const mutationToken = `mutation {
        createToken{ token,expiresIn }
      }`;
      this.genericRequestService.mutation('oauth', mutationToken).subscribe(response => {
        const token: TokenApplication = response;
        this.oauthAppilicationService.insertOrUpdateToken(token, dateCurrent);
        this.createCompany();
      }, error => console.log(error));
   } else {
        this.createCompany();
     }
   }
   /**
    * Cria a empresa
    */
   private createCompany(): void {
    const companyName: string = this.registerForm.get('companyName').value;
    const email: string = this.registerForm.get('email').value;
    const password: string = this.registerForm.get('password').value;

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
       name: companyName,
       email: email,
       password: password
    };
    this.genericRequestService.mutationWithVariable('application', mutation, variables)
        .subscribe(responseApplication => console.log(responseApplication), error => console.log(error));
   }

}
