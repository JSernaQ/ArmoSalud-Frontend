import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Subject } from 'rxjs';
import { InventoryServiceService } from 'src/app/services/inventory-service.service';

@Component({
  selector: 'app-recent-activity-home-component',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss'],
  standalone: false
})
export class RecentActivityComponent implements OnInit {

  private destroy$ = new Subject<void>();
  invoices: any[] = [];
  today: any;
  
  constructor(private inventoryServices: InventoryServiceService) { }

  ngOnInit() {
    this.getInformation();
    this.inventoryServices.update$.subscribe(() => {
      this.getInformation();
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async getInformation() {
    
    const { value } = await Preferences.get({ key: 'invoiceList'});
    this.invoices = JSON.parse(value!);
    this.today = this.invoices[0].date.substring(0, 10)
    
    console.log(this.invoices);
    
  }

}
