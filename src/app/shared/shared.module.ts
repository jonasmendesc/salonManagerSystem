import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../shared/input/input.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [InputComponent],
  exports: [FormsModule, ReactiveFormsModule, InputComponent, CommonModule]
})
export class SharedModule { }
