import { NgModule } from '@angular/core';

import { ModalComponent, ModalDirectivesDirective } from './modal/modal.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { InputComponent } from './input/input.component';
import { CalorieChartComponent } from './calorie-chart/calorie-chart.component';
import { MacroChartComponent } from './macro-chart/macro-chart.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    ModalComponent,
    ModalDirectivesDirective,
    DashboardComponent,
    HeaderComponent,
    InputComponent,
    CalorieChartComponent,
    MacroChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  exports: [
    ModalComponent,
    ModalDirectivesDirective,
    DashboardComponent,
    HeaderComponent,
    InputComponent,
    CalorieChartComponent,
    MacroChartComponent
  ]
})
export class SharedModule {}
