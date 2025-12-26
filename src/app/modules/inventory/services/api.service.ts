import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient, private router: Router ) { }

  getAllProducts(token: any): Observable<any> {
    return this.http.get(`${environment.api_url}/product/`, {headers: {authorization: `${token}`}})
  };

}
