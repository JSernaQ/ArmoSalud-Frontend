import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { firstValueFrom, Subject } from 'rxjs';
import { ApiServicesService } from './api-services.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryServiceService {

  private updateSubject = new Subject<void>();

  update$ = this.updateSubject.asObservable();

  constructor(private apiServices: ApiServicesService) {

  }

  async getToken() {
    const { value } = await Preferences.get({ 'key': 'token' });
    return value;
  }

  async updateProductList() {
    const token = await this.getToken();
    const productResponse = await firstValueFrom(this.apiServices.getAllProducts(token));

    const products = productResponse.products;

    await Preferences.remove({ key: 'productList' });

    await Preferences.set({
      key: 'productList',
      value: JSON.stringify(products)
    });

    this.updateSubject.next();
  }

  async updateDailyInvoices() {
    const token = await this.getToken();
    const invoiceResponse = await firstValueFrom(this.apiServices.getInvoicesByDay(token, Date()));
    const dailyInvoices = invoiceResponse.invoices;
    await Preferences.set({
      key: 'invoiceList',
      value: JSON.stringify(dailyInvoices)
    });

    this.updateSubject.next();
  }
}
