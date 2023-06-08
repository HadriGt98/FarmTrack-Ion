import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsageService {

  baseUrl = 'http://pat.infolab.ecam.be:60841/api/';
  // baseUrl = 'http://localhost:3000/api/';

  constructor( private http: HttpClient, private router:Router, private jwtHelper:JwtHelperService ) { }

  getUsages(vehicle_id: number): Observable<any> {
    const url = `${this.baseUrl + 'usages'}/${vehicle_id}`;	
    return this.http.get(url);
  }

  getUsage(usage_id: number): Observable<any> {
    const url = `${this.baseUrl + 'usage'}/${usage_id}`;
    return this.http.get<any>(url);
  }

  addUsage(usage: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'usage', usage);
  }

  updateUsage(usage_id: number, usage: any): Observable<any> {
    const url = `${this.baseUrl + 'usage'}/${usage_id}`;
    return this.http.put<any>(url, usage);
  }

  deleteUsage(usage_id: number): Observable<any> {
    const url = `${this.baseUrl + 'usage'}/${usage_id}`;
    return this.http.delete<any>(url);
  }
}
