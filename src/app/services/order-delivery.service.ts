import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDelivery } from '@app/models';
import { City } from '@app/models';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderDeliveryService {

  private BASE_URL = environment.webApi;
  
  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    const url = `${this.BASE_URL}/cities`;
    return this.http.get<City[]>(url);
  }

  createOrder(order: OrderDelivery) {
    const url = `${this.BASE_URL}/submit`;
    return this.http.post(url, order);
  }

}