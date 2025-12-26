import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductIndividualCardComponent } from './components/product-individual-card/product-individual-card.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { InfoCardsComponent } from './components/info-cards/info-cards.component';
import { SharedModule } from 'src/app/components/shared/shared.module';



@NgModule({
  declarations: [
    ProductIndividualCardComponent,
    ProductsListComponent,
    NavbarComponent,
    SearchBarComponent,
    InfoCardsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
  ],
  exports: [
    ProductIndividualCardComponent,
    ProductsListComponent,
    NavbarComponent,
    SearchBarComponent,
    InfoCardsComponent
  ]
})
export class InventoryModule { }
