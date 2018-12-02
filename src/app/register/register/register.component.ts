import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'ssm-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) { }

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
}