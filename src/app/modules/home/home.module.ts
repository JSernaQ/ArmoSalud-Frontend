import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MainCardsComponent } from './components/main-cards/main-cards.component';
import { RecentActivityComponent } from './components/recent-activity/recent-activity.component';
import { WelcomeComponent } from './components/welcome/welcome.component';



@NgModule({
  declarations: [
    MainCardsComponent,
    RecentActivityComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    MainCardsComponent,
    RecentActivityComponent,
    WelcomeComponent
  ]
})
export class HomeModule { }
