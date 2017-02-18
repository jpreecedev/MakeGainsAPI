import { NgModule } from '@angular/core';

import { ModalComponent, ModalDirectivesDirective } from './modal/modal.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ModalComponent,
    ModalDirectivesDirective,
    HeaderComponent,
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
    HeaderComponent,
    InputComponent
  ]
})
export class SharedModule {}
