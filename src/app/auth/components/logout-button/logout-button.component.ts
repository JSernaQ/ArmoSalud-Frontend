import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss'],
  standalone: false
})
export class LogoutButtonComponent {

  constructor(private router: Router) { }

  async logout() {
    await Preferences.clear();
    this.router.navigate(['/login']);
  }
}
