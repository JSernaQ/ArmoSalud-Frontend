import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './components/login/login.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutButtonComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    LoginComponent,
    LogoutButtonComponent
  ]
})
export class AuthModule { }
