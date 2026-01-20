import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  disable: boolean = false;
  isAlertOpen: boolean = false;
  msgAlert: string = '';
  colorAlert: string = 'danger'

  constructor(private auth: AuthService, private router: Router, private loadingCtrl: LoadingController) { }

  async signIn() {
    if (!this.username || !this.password) {
      this.setOpenAlert(true, 'Usuario y contraseña obligatorios', 'danger');
      return;
    }
    this.disable = true;

    try {
      
      const response = await firstValueFrom(this.auth.login(this.username, this.password));
      this.showLoading();
      
      if (!response.ok) {
        return
      }
      await Preferences.set({ key: 'token', value: response.token })
      await Preferences.set({ key: 'user', value: JSON.stringify(response.user) })
      // const { response } = await Preferences.get({key: 'user'});
      // const user = response ? JSON.parse(response) : null 
      
      this.router.navigate(['/tabs/home'])
      
    } catch (error) {
      this.disable = false;
      this.setOpenAlert(true, 'Verifica la Información', 'danger')
    }
    
  }

  async showLoading(){ 
    const loading = await this.loadingCtrl.create({
      message: 'Ingresando.. espere un momento.',
      duration: 2000,
    });

    loading.present();
  }

  async setOpenAlert(isOpen: boolean, msg: string = '', color: string = 'danger') {
    this.msgAlert = msg;
    this.colorAlert = color;
    this.isAlertOpen = isOpen;
  }

}
