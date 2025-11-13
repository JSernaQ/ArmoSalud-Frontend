import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryPageRoutingModule } from './inventory-routing.module';

import { InventoryPage } from './inventory.page';
import { ProductIndividualCardComponent } from 'src/app/modules/inventory/components/product-individual-card/product-individual-card.component';
import { ProductsListComponent } from 'src/app/modules/inventory/components/products-list/products-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryPageRoutingModule
  ],
  declarations: [
    InventoryPage,
    ProductIndividualCardComponent,
    ProductsListComponent
  ]
})
export class InventoryPageModule {}
