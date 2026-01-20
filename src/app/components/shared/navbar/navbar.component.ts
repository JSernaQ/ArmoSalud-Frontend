import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false
})
export class NavbarComponent  implements OnInit {

  user: any = '';

  constructor() { }

  ngOnInit() {
    this.getUser();
  }

  async getUser() {
    const { value } = await Preferences.get({ key: 'user' })
    this.user = value ? JSON.parse(value) : false;
  }

}
