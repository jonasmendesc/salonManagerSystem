import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/login.service';

@Component({
  selector: 'ssm-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  /**
   * Object do angular que representa o formulário
   */
  loginForm: FormGroup;
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  /**
   * Construtor do componente de login
   * @param formBuilder Construtor do formulário do angular
   */
  constructor(private formBuilder: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(12)])
    });
  }
  
  
  clickEventHandler() {

    this.loginService.singUp(
      {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value
      });
  }
}
