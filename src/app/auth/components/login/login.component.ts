import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private auth: AuthService, private router: Router) { }

  async signIn() {

    if (!this.username || !this.password) {
      console.error('Usuario y contraseña obligatorios');
      return;
    }

    const response = await firstValueFrom(this.auth.login(this.username, this.password));

    if (response.ok) {

      await Preferences.set({ key: 'token', value: response.token })
      await Preferences.set({ key: 'user', value: JSON.stringify(response.user) })
      // const { value } = await Preferences.get({key: 'user'});
      // const user = value ? JSON.parse(value) : null 
      
      this.router.navigate(['/tabs/home'])
    }
  }


}
