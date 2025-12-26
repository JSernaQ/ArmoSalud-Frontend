import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-info-cards-inventory',
  templateUrl: './info-cards.component.html',
  styleUrls: ['./info-cards.component.scss'],
  standalone: false
})
export class InfoCardsComponent implements OnInit {

  @Input() productList: any[] = [];

  stockOut: any = 0;
  stockLow: any = 0;
  productsQuantity: any = 0;
  outList: any = [];
  lowList: any;

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.chargeInfo()
    
  }

  async chargeInfo() {
    this.productsQuantity = this.productList.length;

    let out = 0;
    let low = 0;
    
    for (const p of this.productList) {
      if (p.stock <= 0){
        out++;
      } else {
        if (p.stock <= p.minStock) {
          low++;
        };
      };
    };
    this.stockOut = out;
    this.stockLow = low;
  };

};