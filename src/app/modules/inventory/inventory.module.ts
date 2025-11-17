import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductIndividualCardComponent } from './components/product-individual-card/product-individual-card.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    ProductIndividualCardComponent,
    ProductsListComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ProductIndividualCardComponent,
    ProductsListComponent,
    NavbarComponent
  ]
})
export class InventoryModule { }
