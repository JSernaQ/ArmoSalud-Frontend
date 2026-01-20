import { Component, OnInit } from '@angular/core';
import { PreloadAllModules, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { firstValueFrom, Subject } from 'rxjs';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { InventoryServiceService } from 'src/app/services/inventory-service.service';

@Component({
  selector: 'app-main-cards-home',
  templateUrl: './main-cards.component.html',
  styleUrls: ['./main-cards.component.scss'],
  standalone: false
})
export class MainCardsComponent implements OnInit {

  quantitySales: number = 0;
  quantityStock: number = 0;

  private destroy$ = new Subject<void>();

  constructor(private apiServices: ApiServicesService, private inventoryService: InventoryServiceService, private router: Router) { }

  ngOnInit() {
    this.getInfo();
    this.inventoryService.update$.subscribe(() => {
      this.recalculateInfo();
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async getToken() {
    const { value } = await Preferences.get({ 'key': 'token' });
    return value;
  }

  async getInfo() {
    try {

      const token = await this.getToken();
      const productResponse = await firstValueFrom(this.apiServices.getAllProducts(token));

      const products = productResponse.products;

      await Preferences.set({
        key: 'productList',
        value: JSON.stringify(products)
      });

      products.forEach((item: any) => {
        if (item.stock <= item.minStock) {
          this.quantityStock++;
        }
      });

      const invoiceResponse = await firstValueFrom(this.apiServices.getInvoicesByDay(token, Date()));
      const dailyInvoices = invoiceResponse.invoices;
      await Preferences.set({
        key: 'invoiceList',
        value: JSON.stringify(dailyInvoices)
      });

      this.quantitySales = dailyInvoices.length;

    } catch (error: any) {
      if (error?.error.msg == 'Token inválido o expirado') {
        await Preferences.clear();
        this.router.navigate(['/login'])
      };
      console.log(error);
    }
  }

  async recalculateInfo() {
    const { value } = await Preferences.get({ key: 'invoiceList' });
    const invoiceList = JSON.parse(value!);
    this.quantitySales = invoiceList.length;

    const productList = await Preferences.get({
      key: 'productList'
    });

    const products = JSON.parse(productList.value!);

    this.quantityStock = 0;
    products.forEach((item: any) => {
      if (item.stock <= item.minStock) {
        this.quantityStock++;
      }
    });

  }

}
