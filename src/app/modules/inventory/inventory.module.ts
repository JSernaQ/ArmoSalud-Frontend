import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductIndividualCardComponent } from './components/product-individual-card/product-individual-card.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ProductIndividualCardComponent,
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ProductIndividualCardComponent,
    ProductsListComponent
  ]
})
export class InventoryModule { }
