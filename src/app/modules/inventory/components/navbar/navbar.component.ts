import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewProductFormComponent } from 'src/app/components/shared/new-product-form/new-product-form.component';

@Component({
  selector: 'app-navbar-inventory',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false
})
export class NavbarComponent  implements OnInit {

  @Output() productCreated = new EventEmitter<void>();

  msgToast: string = '';
  isToastOpen: boolean = false;

  constructor(private ctrlModal: ModalController) { }

  ngOnInit() {}

  async openModal() {
    const modal = await this.ctrlModal.create({
      component: NewProductFormComponent,
      componentProps: { title: "NUEVO PRODUCTO", nextBtn: "Añadir" }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.msgToast = 'Producto añadido con éxito';
      this.isToastOpen = true;
      this.productCreated.emit();
    }
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
