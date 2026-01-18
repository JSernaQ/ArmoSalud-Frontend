import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { ModalController, RefresherCustomEvent } from '@ionic/angular';
import { NewProductFormComponent } from 'src/app/components/shared/new-product-form/new-product-form.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  standalone: false
})
export class ProductsListComponent implements OnInit {

  @Output() listUpdated = new EventEmitter<any[]>();

  productList: any = [];
  originalProductList: any = [];
  isToastOpen = false;
  msg: string = ''
  msgColor: string = 'danger'

  constructor(private api: ApiService, private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.setOpen(false);
    this.msg = ''
    this.msgColor = 'danger'
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
        await Preferences.clear();
        this.router.navigate(['/login']);
      }

      const response = await firstValueFrom(this.api.getAllProducts(token));

      this.productList = [...response.products];
      this.originalProductList = [...response.products];

      this.listUpdated.emit(this.productList);

    } catch (error: any) {

      console.log('Error: ', error?.error.msg);
      this.msg = error?.error.msg;
      this.msgColor = 'danger';
      this.setOpen(true);

      if (error?.error.msg == 'Token inválido o expirado') {
        await Preferences.clear();
        this.router.navigate(['/login'])
      };
    };
  };

  filterProducts(term: string) {

    const value = term.trim().toLowerCase();

    if (term.length === 0 || !value) {
      this.productList = this.originalProductList;
      this.listUpdated.emit(this.productList);
      return;
    }

    this.productList = this.originalProductList.filter((product: any) =>
      product.name.toLowerCase().includes(value) ||
      product.code.toLowerCase().includes(value)
    );

    this.listUpdated.emit(this.productList);
  }


  async seeDetails(product: any) {

    const model = await this.modalCtrl.create({
      component: NewProductFormComponent,
      componentProps: {
        title: "EDITAR PRODUCTO",
        nextBtn: "Guardar",
        productData: product
      }
    });
    model.present();

    const { data, role } = await model.onWillDismiss();

    if (role === 'confirm') {
      this.msgColor = 'success';
      this.msg = 'Producto actualizado Correctamente';
      this.setOpen(true);
      this.getAllProducts();
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
