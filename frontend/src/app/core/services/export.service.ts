import { Injectable, inject } from '@angular/core';
import { MockNetworkService } from './mock-network.service';
import { SocEventService } from './soc-event.service';
import { AuditTrailService } from './audit-trail.service';
import { AuthService } from './auth.service';

export type FormatoExportacion = 'csv' | 'excel' | 'pdf';

@Injectable({ providedIn: 'root' })
export class ExportService {
  private readonly mock = inject(MockNetworkService);
  private readonly events = inject(SocEventService);
  private readonly audit = inject(AuditTrailService);
  private readonly auth = inject(AuthService);

  exportar(
    tipo: 'logs' | 'alertas' | 'metricas' | 'auditoria' | 'incidentes',
    formato: FormatoExportacion
  ): void {
    let contenido = '';
    let nombre = `netguard-${tipo}`;

    switch (tipo) {
      case 'logs':
        contenido = this.aCsv(
          ['id', 'timestamp', 'nivel', 'modulo', 'mensaje'],
          this.events.eventos().map(l => [
            l.id,
            l.timestamp.toISOString(),
            l.nivel,
            l.modulo,
            l.mensaje
          ])
        );
        break;
      case 'alertas':
        contenido = this.aCsv(
          ['id', 'nivel', 'mensaje', 'ip', 'vlan', 'reconocida'],
          this.mock.alertas().map(a => [
            a.id,
            a.nivel,
            a.mensaje,
            a.ip,
            String(a.vlan),
            String(a.reconocida)
          ])
        );
        break;
      case 'metricas': {
        const m = this.mock.metricas();
        contenido = this.aCsv(
          ['metrica', 'valor'],
          Object.entries(m).map(([k, v]) => [k, String(v)])
        );
        break;
      }
      case 'auditoria':
        contenido = this.aCsv(
          ['id', 'timestamp', 'usuario', 'accion', 'modulo', 'detalle'],
          this.audit.registros().map(r => [
            r.id,
            r.timestamp.toISOString(),
            r.usuarioNombre,
            r.accion,
            r.modulo,
            r.detalle
          ])
        );
        break;
      case 'incidentes':
        contenido = this.aCsv(
          ['dispositivo', 'ip', 'seguridad', 'vlan'],
          this.mock
            .dispositivos()
            .filter(d => d.seguridad !== 'seguro')
            .map(d => [d.nombre, d.ip, d.seguridad, String(d.vlan)])
        );
        break;
    }

    if (formato === 'pdf') {
      contenido = this.aPdfMock(tipo, contenido);
      nombre += '.txt';
    } else if (formato === 'excel') {
      nombre += '.csv';
    } else {
      nombre += '.csv';
    }

    this.descargar(contenido, nombre, formato === 'pdf' ? 'text/plain' : 'text/csv');
    this.audit.registrar('export', 'REPORTES', `Exportación ${tipo} (${formato})`, false);
  }

  private aCsv(headers: string[], rows: string[][]): string {
    const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
    return [headers.map(esc).join(','), ...rows.map(r => r.map(esc).join(','))].join('\n');
  }

  private aPdfMock(tipo: string, data: string): string {
    const u = this.auth.usuario();
    return [
      'NETGUARD SOC — REPORTE SIMULADO (PDF mock)',
      `Tipo: ${tipo}`,
      `Generado: ${new Date().toISOString()}`,
      `Usuario: ${u?.nombre ?? 'N/A'}`,
      '---',
      data
    ].join('\n');
  }

  private descargar(contenido: string, nombre: string, mime: string): void {
    const blob = new Blob([contenido], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombre;
    a.click();
    URL.revokeObjectURL(url);
  }
}
