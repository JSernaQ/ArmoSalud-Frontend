import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { ApiServicesService } from 'src/app/services/api-services.service';


@Component({
  selector: 'app-new-product-form',
  templateUrl: './new-product-form.component.html',
  styleUrls: ['./new-product-form.component.scss'],
  standalone: false
})
export class NewProductFormComponent implements OnInit {

  @Input("title") title: any;
  @Input("nextBtn") nextBtn: any;
  @Input("productData") productData: any;
  
  formProduct!: FormGroup;
  owners: any = [];
  presentations: any = [];

  msgToast: string = '';
  isToastOpen: boolean = false;

  presentationState = {
    uni: { enable: true, equivalence: null as number | null, price: null as number | null },
    tab: { enable: false, equivalence: null as number | null, price: null as number | null },
    caj: { enable: false, equivalence: null as number | null, price: null as number | null },
  }

  uniExists = this.presentationState.uni.enable;
  tabExists = this.presentationState.tab.enable;
  cajExists = this.presentationState.caj.enable;
  
  constructor(private modalCtrl: ModalController, private api: ApiServicesService, private fb: FormBuilder) { }
  
  ngOnInit() {
    this.getOwners();
    const data = this.productData ?? {};
    this.formProduct = this.fb.group({
      code: [data.code || '', Validators.required],
      name: [data.name || '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: [data.description ||'', Validators.maxLength(200)],
      owner_id: [data.owner ||'', Validators.required],
      stock: [data.stock || '', [Validators.required, Validators.min(0)]],
      min_stock: [data.minStock || '', [Validators.required, Validators.min(0)]], 
    })
    for (const pres of data.presentations || []) {
      const key = pres.type.toLowerCase().slice(0,3);
      if (this.presentationState[key as keyof typeof this.presentationState]){
        this.presentationState[key as keyof typeof this.presentationState].enable = true;
        this.presentationState[key as keyof typeof this.presentationState].equivalence = pres.equivalence;
        this.presentationState[key as keyof typeof this.presentationState].price = pres.price;
      };
    };        
  }

  async getToken() {
    const { value: token } = await Preferences.get({ key: 'token' })
    return token
  }

  async getOwners() {
    const token = await this.getToken()
    const users = await firstValueFrom(this.api.getOwners(token))
    this.owners = users.userList;
  }

  buildPresentations() {
    this.presentations = [];

    const map = {
      uni: 'Unidad',
      tab: 'Tableta',
      caj: 'Caja'
    };

    for (const key of Object.keys(this.presentationState) as Array<keyof typeof this.presentationState>) {
      
      const pres = this.presentationState[key as keyof typeof this.presentationState];
      if (pres.enable) {
        if (!pres.equivalence || !pres.price) {
          throw new Error(`Datos incompletos en ${map[key]}`);
        }
        this.presentations.push({
          type: map[key],
          equivalence: pres.equivalence,
          price: pres.price
        });
      }
    }


    if (this.presentations.length === 0) {
      this.msgToast = "Debe seleccionar al menos una presentación";
      this.isToastOpen = true;
    }
  }

  onToggle(type: 'uni' | 'tab' | 'caj') {
    if (!this.presentationState[type].enable) {
      this.presentationState[type].equivalence = null;
      this.presentationState[type].price = null;
    }
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  cancel() {
    this.isToastOpen = false;
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    if (this.formProduct.invalid) {
      this.formProduct.markAllAsTouched();  
      return;
    }

    this.buildPresentations();

    const token = await this.getToken()
    const body = {
      ...this.formProduct.value,  
      presentations: this.presentations
    };

    console.log(this.nextBtn);
    if (this.nextBtn === 'Guardar') {
      this.api.updateProduct(token, { ...body, productId: this.productData._id }).subscribe({
        next: (response: any) => {
          this.modalCtrl.dismiss({ body, ok: true }, 'confirm');
        },
        error: (error: any) => {
          this.msgToast = error?.error.msg || 'Error desconocido';
          this.setOpen(true);
        }
      });
      return;
    } else {
      this.api.createNewProduct(token, body).subscribe({
        next: (response: any) => {
          this.modalCtrl.dismiss({ body, ok: true }, 'confirm');
        },
        error: (error: any) => {
          this.msgToast = error?.error.msg || 'Error desconocido';
          this.setOpen(true);
        }
      });
    }
  }
}
