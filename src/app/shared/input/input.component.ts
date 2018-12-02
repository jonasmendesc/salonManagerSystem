import { Component, OnInit, Input, AfterContentInit, ContentChild } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Component({
  selector: 'ssm-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  formControlName: FormControlName;
  @Input()errorMessage: string;
  @Input()label: string;
  inputFormControlName: any;
  @ContentChild(FormControlName) control = FormControlName;

  ngOnInit() {
  }
  /**
   * Executa apos o componente for carregado
   */
  ngAfterContentInit(): void {
    this.inputFormControlName = this.control;
    if (this.inputFormControlName === undefined) {
      throw new Error('Esse componente precisa ser usado com uma diretiva formControlName');
    }
  }
  /**
   * Valida se o formulario e valido
   */
  hasSuccess(): boolean {
    return this.inputFormControlName.valid && (this.inputFormControlName.dirty || this.inputFormControlName.touched);
  }

  /**
   * Valida se o formulario é invalido
   */
  hasError(): boolean {
    return this.inputFormControlName.invalid && (this.inputFormControlName.dirty || this.inputFormControlName.touched);
  }
}
