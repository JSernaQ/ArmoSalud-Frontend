import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MainCardsComponent } from './components/main-cards/main-cards.component';
import { RecentActivityComponent } from './components/recent-activity/recent-activity.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ShortcutComponent } from './components/shortcut/shortcut.component';



@NgModule({
  declarations: [
    MainCardsComponent,
    RecentActivityComponent,
    NotificationComponent,
    ShortcutComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    MainCardsComponent,
    RecentActivityComponent,
    NotificationComponent,
    ShortcutComponent
  ]
})
export class HomeModule { }
