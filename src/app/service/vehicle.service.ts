import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  baseUrl = 'http://pat.infolab.ecam.be:60841/api/';
  // baseUrl = 'http://localhost:3000/api/';

  constructor( private http: HttpClient, private router:Router, private jwtHelper:JwtHelperService ) { }

  getVehicles(): Observable<any> {
    return this.http.get(this.baseUrl + 'vehicles');
  }

  addVehicle(vehicle: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'vehicle', vehicle);
  }

  getVehicle(vehicle_id: number): Observable<any> {
    const url = `${this.baseUrl + 'vehicle'}/${vehicle_id}`;
    return this.http.get<any>(url);
  }

  updateVehicle(vehicle_id: number, vehicle: any): Observable<any> {
    const url = `${this.baseUrl + 'vehicle'}/${vehicle_id}`;
    return this.http.put<any>(url, vehicle);
  }

  deleteVehicle(vehicle_id: number): Observable<any> {
    const url = `${this.baseUrl + 'vehicle' }/${vehicle_id}`;
    return this.http.delete<any>(url);
  }

  getVehicleStats(vehicle_id: number): Observable<any> {
    const url = `${this.baseUrl + 'stats'}/${vehicle_id}`;
    return this.http.get<any>(url);
  }

  searchVehicles(search: string): Observable<any> {
    const url = `${this.baseUrl + 'search/vehicles?model_make=' + search}`;
    console.log('URL: ', url)
    return this.http.get<any>(url);
  }
}
