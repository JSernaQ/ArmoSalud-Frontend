import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { firstValueFrom, reduce } from 'rxjs';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-stats-cards-reports',
  templateUrl: './stats-cards.component.html',
  styleUrls: ['./stats-cards.component.scss'],
  standalone: false
})
export class StatsCardsComponent  implements OnInit {

  segment: 'daily' | 'weekly' |'monthly' = 'daily';
  todayDate!: string
  day!: string
  week!: string
  month!: string

  invoicesList: any[] = []

  totalDailySales: any = 0;
  totalDailyInvoices: any = 0;

  constructor(private apiService: ApiServicesService, private router: Router) { }

  ngOnInit() {
    this.today();
    this.chargeDaylySales();
  }

  test(){
    
  }

  async getToken() {
    const { value: token } = await Preferences.get({ key: 'token' })
    return token
  }

  today(){
    const today = new Date();
    this.todayDate = today.toISOString().substring(0, 10);
    this.month = today.toISOString().substring(0, 7);
  }

  async getInvoices(date: any){
    try {
      
      const token = await this.getToken();
      const response = await firstValueFrom(this.apiService.getInvoicesByDay(token, date))
      this.invoicesList = response.invoices;
      
    } catch (error: any) {

      console.log(error);

      if (error?.error.msg == 'Token inválido o expirado') {
        await Preferences.clear();
        this.router.navigate(['/login'])
      };

    }
  }

  async chargeDaylySales(){

    await this.getInvoices(this.todayDate);
    this.totalDailySales = await this.invoicesList.reduce((acc, invoice) => {
      return acc + invoice.totalAmount;
    }, 0);

    this.totalDailyInvoices = this.invoicesList.length

  }

}
