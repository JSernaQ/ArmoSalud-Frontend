import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { ApiServicesService } from 'src/app/services/api-services.service';

interface itemBilling {
  productId: string;
  productCode: string;
  productName: string;
  presentationId: string;
  presentationType: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

@Component({
  selector: 'app-billing',
  templateUrl: './billing.page.html',
  styleUrls: ['./billing.page.scss'],
  standalone: false
})
export class BillingPage implements OnInit {

  productList: any = [];
  originalProductList: any = [];

  itemList: itemBilling[] = [];
  subTotal: number = 0;
  totalAmount: number = 0;
  discountAmount!: number;
  method!: string;

  isToastOpen: boolean = false;
  toastMsg: string = '';
  toastColor: string = 'danger';

  isOpenModal: boolean = false;

  searchTerm: string = '';
  selectedPresentation: any = {};


  constructor(private api: ApiServicesService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    
    this.getProductList();
    this.chargeCacheItems();
    this.getTotal();
  }

  async chargeCacheItems() {
    try {
      const { value } = await Preferences.get({ key: 'billing_items' });

      if (value) {
        this.itemList = JSON.parse(value);
      }

    } catch (error) {
      console.log('Error al cargar los ítems en caché: ', error);
    }

    this.getTotal();
  }

  async registerInvoice() {
    if (this.itemList.length === 0) {
      this.toastColor = 'danger';
      this.toastMsg = 'No hay productos en la factura';
      this.setOpen(true);
      return;
    }

    if (!this.method) {
      this.toastColor = 'danger';
      this.toastMsg = 'Seleccione un método de pago';
      this.setOpen(true);
      return;
    }

    if (await this.presentAlert('Confirmar', '¿Está seguro de la información de la factura?') === 'cancel') {
      return;
    }    

    const {value} = await Preferences.get({ key:'user'});

    const token = await this.getToken();
    const sellerId = JSON.parse(value!)._id;

    try {
      
      const response: any = await firstValueFrom(this.api.createNewInvoice(token, {
        items: this.itemList,
        seller: sellerId,
        subTotal: this.subTotal,
        totalAmount: this.totalAmount,
        discount: this.discountAmount || 0,
        paymentMethod: this.method
      }))

      if (response.ok) {
        this.toastColor = 'success';
        this.toastMsg = 'Factura creada con éxito';
        this.setOpen(true);
        this.itemList = [];
        await Preferences.remove({ key: 'billing_items'});
      }
      
    } catch (error: any) {
      this.toastColor = 'danger';
      this.toastMsg = error.error.msg || 'Error al crear la factura';
      this.setOpen(true);
    }
  }

  async addItem(item: any, presentation: any) {
    this.modalIsOpen(false);
    const newItem: itemBilling = {
      productId: item._id,
      productCode: item.code,
      productName: item.name,
      presentationId: presentation._id,
      presentationType: presentation.type,
      quantity: 1,
      unitPrice: presentation.price,
      total: presentation.price,
    };
    this.itemList.push(newItem);
    this.selectedPresentation = {};
    await Preferences.set({ key: 'billing_items', value: JSON.stringify(this.itemList) });
    this.getTotal();
  };
  
  async updateItem(item: itemBilling, price: number, quantity: number) {
    const index = this.itemList.indexOf(item);
    if (index !== -1) {
      this.itemList[index].unitPrice = price;
      this.itemList[index].quantity = quantity;
      this.itemList[index].total = (price * quantity);
    };
    await Preferences.set({ key: 'billing_items', value: JSON.stringify(this.itemList) });
    this.getTotal();
  };
  
  async removeAllItems() { 
    let condition = await this.presentAlert('Eliminar todos los ítems', '¿Está seguro de eliminar todos los ítems de la factura?');

    if (condition === 'cancel') { return; }
    
    this.itemList = [];
    await Preferences.remove({ key: 'billing_items' });
    this.getTotal();
  }
  
  async removeItem(item: itemBilling) {
    const index = this.itemList.indexOf(item);
    if (index !== -1) {
      let condition = await this.presentAlert('Eliminar ítem', '¿Está seguro de eliminar este ítem de la factura?');
    
      if (condition === 'cancel') { return; }
      this.itemList.splice(index, 1);
    }
    await Preferences.set({ key: 'billing_items', value: JSON.stringify(this.itemList) });
    this.getTotal();
  }

  getTotal() {
    this.subTotal = this.itemList.reduce((total, item) => {
      return total + item.total;
    }, 0)

    if (this.discountAmount > 100) {
      this.discountAmount = 0;
    }

    if (this.discountAmount && this.discountAmount > 0 && this.discountAmount <= 100) {
      this.totalAmount = this.subTotal - (this.subTotal/100*this.discountAmount);
      return;
    }

    this.totalAmount = this.subTotal;
  }

  async getToken() {
    const { value: token } = await Preferences.get({ key: 'token' })
    return token
  }

  async getProductList() {
    try {
      const token = await this.getToken();
      if (!token) {
        await Preferences.clear();
        this.router.navigate(['/login']);
      }

      const response = await firstValueFrom(this.api.getAllProducts(token));

      this.productList = [...response.products];
      this.originalProductList = [...response.products];

    } catch (error: any) {

      console.log('Error: ', error?.error.msg);

      if (error?.error.msg == 'Token inválido o expirado') {
        await Preferences.clear();
        this.router.navigate(['/login'])
      };
    };
  }

  modalIsOpen(isOpen: boolean) {
    this.isOpenModal = isOpen;
  }

  async addProduct() {
    this.modalIsOpen(true);
  }

  filterProducts() {

    const value = this.searchTerm.trim().toLowerCase();

    if (this.searchTerm.length === 0 || !value) {
      this.productList = this.originalProductList;
      return;
    }

    this.productList = this.originalProductList.filter((product: any) =>
      product.name.toLowerCase().includes(value) ||
      product.code.toLowerCase().includes(value)
    );

  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          cssClass: 'primary'
        }
      ]
    })

    await alert.present();

    const { role } = await alert.onDidDismiss();
    return role
   }

  setOpen(open: boolean) {
    this.isToastOpen = open;
  }

}