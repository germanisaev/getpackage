import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = environment.webApi;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  private getElementUrl(param: any) {
    return this.BASE_URL + '/' + encodeURIComponent(String(param));
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  logIn(username: string, password: string): Observable<User> {
    const url = `${this.BASE_URL}/login`;
    return this.http.post<User>(url, { username, password });
  }

  removeUser(username: string) {
    return this.http.delete(this.getElementUrl(username), this.httpOptions);
  }
  
}