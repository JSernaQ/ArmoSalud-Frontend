import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { ModalController, RefresherCustomEvent } from '@ionic/angular';
import { ProductIndividualCardComponent } from '../product-individual-card/product-individual-card.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  standalone: false
})
export class ProductsListComponent implements OnInit {

  productList: any = [];
  isToastOpen = false;
  msg: string = ''
  msgColor: string = 'danger'

  constructor(private api: ApiService, private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {

    this.getAllProducts()

  }

  async getToken() {
    const { value: token } = await Preferences.get({ key: 'token' })
    return token
  }

  async getAllProducts() {

    try {
      const token = await this.getToken();
      if (!token) {
        this.router.navigate(['/login'])
      }
      const response = await firstValueFrom(this.api.getAllProducts(token));

      this.productList = response.products;
      console.log(this.productList[0]);


    } catch (error: any) {

      console.log('Error: ', error?.error.msg);
      this.msg = error?.error.msg;
      this.msgColor = 'danger';
      this.setOpen(true);

    }

  }

  async seeDetails(product: any) {

    const model = await this.modalCtrl.create({
      component: ProductIndividualCardComponent,
      componentProps: {
        productData: product
      }
    });
    model.present();

    const {data, role} = await model.onWillDismiss();

    if (role === 'confirm') {
      this.msgColor = 'success';
      this.msg = 'Producto actualizado'
      this.setOpen(true);
    }

  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  handleRefresh(event: RefresherCustomEvent) {
    this.getAllProducts();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
