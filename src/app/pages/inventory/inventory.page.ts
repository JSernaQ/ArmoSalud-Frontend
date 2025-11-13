import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
  standalone: false
})
export class InventoryPage implements OnInit {

  constructor( private ModalCtrl: ModalController) { }

  ngOnInit() {
  }

  openModal() {
    console.log('hola');
    
  }
}
