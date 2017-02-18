import { NgModule } from '@angular/core';

import { ModalComponent, ModalDirectivesDirective } from './modal/modal.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ModalComponent,
    ModalDirectivesDirective,
    InputComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalComponent,
    ModalDirectivesDirective,
    InputComponent
  ]
})
export class SharedModule {}
