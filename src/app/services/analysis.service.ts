import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:3000";
// const API_URL = "https://vhr-zeii.onrender.com";

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  constructor(private http: HttpClient) { }

  getAnalysisByMonth(month: string): Observable<any> {
    return this.http.get(`${API_URL}/analysis/by-month?month=${month}`);
  }
}
