// network.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private api = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getEventos() {
    return this.http.get(`${this.api}/eventos`);
  }

  getAlertas() {
    return this.http.get(`${this.api}/alertas`);
  }
}