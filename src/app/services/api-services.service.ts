import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  constructor(private http: HttpClient) { }

  getOwners(token: any): Observable<any> {
    return this.http.get(`${environment.api_url}/user/getUsers`, { headers: { authorization: `${token}` } })
  }

  getAllProducts(token: any): Observable<any> {
    return this.http.get(`${environment.api_url}/product/`, {headers: {authorization: `${token}`}})
  };

  createNewProduct(token: any, body: any) {
    return this.http.post(`${environment.api_url}/product/create`, body, {headers: {authorization: `${token}`}})
  }
  
  updateProduct(token: any, body: any) {
    return this.http.put(`${environment.api_url}/product/update`, body, {headers: {authorization: `${token}`}})
  }

  createNewInvoice(token: any, body: any) {
    return this.http.post(`${environment.api_url}/invoice/create`, body, {headers: {authorization: `${token}`}})
  }


}
