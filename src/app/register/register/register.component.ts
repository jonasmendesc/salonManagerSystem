import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RegisterService } from 'src/app/core/register.service';
import { AuthService, FacebookLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'ssm-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService,
              private authService: AuthService) { }

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

    this.registerService.register(
      {
        companyName: this.registerForm.get('companyName').value,
        password: this.registerForm.get('password').value,
        email: this.registerForm.get('email').value
      }
    );

   }

   signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

}
