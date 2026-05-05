import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Dispositivo, EstadisticasDispositivos } from '../core/models/dispositivo.model';
import { ListadoAlertas } from '../core/models/alerta.model';

@Injectable({ providedIn: 'root' })
export class NetworkService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDispositivos(): Observable<Dispositivo[]> {
    return this.http.get<Dispositivo[]>(`${this.apiUrl}/dispositivos`);
  }

  getEstadisticas(): Observable<EstadisticasDispositivos> {
    return this.http.get<EstadisticasDispositivos>(`${this.apiUrl}/dispositivos/estadisticas`);
  }

  getAlertas(limit = 10): Observable<ListadoAlertas> {
    return this.http.get<ListadoAlertas>(`${this.apiUrl}/alertas?limit=${limit}`);
  }

  // Mantén los datos mock mientras no tengas backend:
  getRouterStatus(): Observable<any> {
    return of({
      role: 'Active',
      primary: '10.0.0.1 (RT-CORE-01)',
      standby: '10.0.0.2 (RT-CORE-02)',
      protocol: 'HSRPv2',
      lastSwitch: 'Hace 14 días'
    });
  }
}