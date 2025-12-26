import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
  standalone: false
})
export class InventoryPage implements OnInit {

  @ViewChild('productsList') productsList: any;
  @ViewChild('infoCards') infoCards: any;
  @ViewChild('searchBar') searchBar: any;

  productList: any[] = [];

  constructor() {}

  ngOnInit() {
  }

  reloadProducts() {
    this.productsList.getAllProducts();
    this.infoCards.getAllProducts();
  }

  onSearch(term: string) {
    this.productsList.filterProducts(term);
  }

  reloadInfoCards(list: any) {
    this.productList = list;
  }

}
