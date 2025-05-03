import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// const API_URL = "http://localhost:3000";
const API_URL = "https://vhr-zeii.onrender.com";

@Injectable({
  providedIn: 'root'
})
export class BillsService {
  constructor(private http: HttpClient) { }

  getBills(type: string): Observable<any> {
    return this.http.get(`${API_URL}/bills?type=${type}`);
  }

  addBill(bill: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/bills`, bill);
  }

  getTransactions(type: string): Observable<any> {
    return this.http.get(`${API_URL}/bills/transaction`);
  }

  addTransaction(billTransaction: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/bills/transaction`, billTransaction);
  }
}
