import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './components/charts/charts.component';
import { StatsCardsComponent } from './components/stats-cards/stats-cards.component';



@NgModule({
  declarations: [
    ChartsComponent,
    StatsCardsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ChartsComponent,
    StatsCardsComponent
  ]
})
export class ReportsModule { }
