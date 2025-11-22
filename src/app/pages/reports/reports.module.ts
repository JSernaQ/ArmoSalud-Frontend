import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportsPageRoutingModule } from './reports-routing.module';

import { ReportsPage } from './reports.page';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { ChartsComponent } from 'src/app/modules/reports/components/charts/charts.component';
import { StatsCardsComponent } from 'src/app/modules/reports/components/stats-cards/stats-cards.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsPageRoutingModule,
    SharedModule,
  ],
  declarations: [ReportsPage, ChartsComponent, StatsCardsComponent]
})
export class ReportsPageModule {}
