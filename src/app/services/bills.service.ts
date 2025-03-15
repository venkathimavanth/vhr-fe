import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = "https://vhr-zeii.onrender.com";

@Injectable({
  providedIn: 'root'
})
export class BillsService {
  constructor(private http: HttpClient) {}

  getBills(type: string): Observable<any> {
    return this.http.get(`${API_URL}/bills`);
  }

  addBill(bill: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/bills`, bill);
  }
}
