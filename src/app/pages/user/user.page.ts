import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: false
})
export class UserPage implements OnInit {

  name!: string;

  constructor() { }

  ngOnInit() {
    this.chargeUserInfo();
  }

  async chargeUserInfo() {
    const { value } = await Preferences.get({ key: 'user' });
    const user = JSON.parse(value!);
    this.name = user.name;
  }
}
