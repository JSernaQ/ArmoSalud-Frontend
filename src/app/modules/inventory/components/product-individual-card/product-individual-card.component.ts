import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-individual-card',
  templateUrl: './product-individual-card.component.html',
  styleUrls: ['./product-individual-card.component.scss'],
  standalone: false
})
export class ProductIndividualCardComponent  implements OnInit {

  @Input() productData: any

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel')
  }

  save() {
    return this.modalCtrl.dismiss(':D', 'confirm')
  }

}
