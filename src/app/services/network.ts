import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SecurityEvent {
  id: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  sourceIp: string;
  destIp: string;
  port: number;
  message: string;
  vlan: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  
  getRouterStatus(): Observable<any> {
    return of({
      role: 'Active',
      primary: '10.0.0.1 (RT-CORE-01)',
      standby: '10.0.0.2 (RT-CORE-02)',
      protocol: 'HSRPv2',
      lastSwitch: 'Hace 14 días'
    });
  }

  getSecurityAlerts(): Observable<SecurityEvent[]> {
    return of([
      { 
        id: 'SYS-8902', 
        severity: 'CRITICAL', 
        sourceIp: '192.168.30.45', 
        destIp: '10.10.10.5', 
        port: 445,
        message: 'Posible escaneo SMB / Intento Ransomware contenido', 
        vlan: 30, 
        timestamp: new Date() 
      },
      { 
        id: 'SYS-8901', 
        severity: 'WARNING', 
        sourceIp: '172.16.5.100', 
        destIp: '8.8.8.8', 
        port: 53,
        message: 'Tráfico DNS inusualmente alto', 
        vlan: 20, 
        timestamp: new Date(new Date().getTime() - 5 * 60000) // Hace 5 minutos
      },
      { 
        id: 'SYS-8900', 
        severity: 'INFO', 
        sourceIp: '10.0.0.1', 
        destIp: '224.0.0.2', 
        port: 1985,
        message: 'HSRP Hello packet recibido', 
        vlan: 10, 
        timestamp: new Date(new Date().getTime() - 15 * 60000) 
      }
    ]);
  }
}