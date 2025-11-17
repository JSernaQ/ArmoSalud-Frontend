import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryPageRoutingModule } from './inventory-routing.module';

import { SharedModule } from 'src/app/components/shared/shared.module';
import { InventoryModule } from 'src/app/modules/inventory/inventory.module';
import { InventoryPage } from './inventory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryPageRoutingModule,
    SharedModule,
    InventoryModule
  ],
  declarations: [
    InventoryPage
  ]
})
export class InventoryPageModule {}
