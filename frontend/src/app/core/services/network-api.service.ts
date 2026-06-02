import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Dispositivo } from '../models/dispositivo.model';
import { ListadoAlertas } from '../models/alerta.model';
import { EstadisticasDispositivos } from '../models/dispositivo.model';

/**
 * Cliente HTTP para futuro backend Node.js.
 * No usado por la UI en modo mock — mantener para integración posterior.
 */
@Injectable({ providedIn: 'root' })
export class NetworkApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getDispositivos(): Observable<Dispositivo[]> {
    return this.http.get<Dispositivo[]>(`${this.apiUrl}/dispositivos`);
  }

  getEstadisticas(): Observable<EstadisticasDispositivos> {
    return this.http.get<EstadisticasDispositivos>(`${this.apiUrl}/dispositivos/estadisticas`);
  }

  getAlertas(limit = 10): Observable<ListadoAlertas> {
    return this.http.get<ListadoAlertas>(`${this.apiUrl}/alertas?limit=${limit}`);
  }
}
