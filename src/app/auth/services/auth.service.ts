import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) { }

  login(username: string , password: string): Observable<any> {
    const body = {
      username,
      password
    }
    return this.http.post(`${environment.api_url}/user/login`, body);
    
  }
}
