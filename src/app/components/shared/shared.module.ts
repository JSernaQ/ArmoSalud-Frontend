import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { IonicModule } from '@ionic/angular';
import { NewProductFormComponent } from './new-product-form/new-product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavbarComponent, 
    NewProductFormComponent
  ],
  imports: [
    CommonModule, 
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent, 
    NewProductFormComponent
  ]
})
export class SharedModule { }