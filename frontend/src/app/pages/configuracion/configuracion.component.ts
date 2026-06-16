import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { SystemConfigService } from '../../core/services/system-config.service';
import { ThemeService } from '../../core/services/theme.service';
import { UxPreferencesService } from '../../core/services/ux-preferences.service';
import { SensibilidadDeteccion } from '../../core/models/config.models';
import { TemaId } from '../../core/models/ux.models';
import { IsoComplianceService } from '../../core/services/iso-compliance.service';
import { PageShellComponent } from '../../shared/components/page-shell/page-shell';

type SeccionConfig =
  | 'red'
  | 'monitoreo'
  | 'alertas'
  | 'simulacion'
  | 'sensibilidad'
  | 'tema'
  | 'calidad-iso';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, PageShellComponent],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.css'
})
export class ConfiguracionComponent {
  readonly auth = inject(AuthService);
  readonly configSvc = inject(SystemConfigService);
  readonly themeSvc = inject(ThemeService);
  readonly uxSvc = inject(UxPreferencesService);
  readonly iso = inject(IsoComplianceService);

  readonly seccionActiva = signal<SeccionConfig>('red');

  readonly secciones: { id: SeccionConfig; label: string; icon: string }[] = [
    { id: 'red', label: 'Red y VLANs', icon: '◎' },
    { id: 'monitoreo', label: 'Monitoreo', icon: '◈' },
    { id: 'alertas', label: 'Alertas', icon: '⚠' },
    { id: 'simulacion', label: 'Simulación', icon: '⟳' },
    { id: 'sensibilidad', label: 'Detección IDS', icon: '⊕' },
    { id: 'tema', label: 'Apariencia', icon: '◐' },
    { id: 'calidad-iso', label: 'Calidad ISO 25000', icon: '◆' }
  ];

  puedeEditar(): boolean {
    return this.auth.puedeConfigurar();
  }

  seleccionar(id: SeccionConfig): void {
    this.seccionActiva.set(id);
  }

  // —— Red ——
  get red() {
    return this.configSvc.valorActual('red');
  }
  setRango(v: string): void {
    this.configSvc.editarSeccion('red', { ...this.red, rangoMonitoreo: v });
  }
  setGateway(v: string): void {
    this.configSvc.editarSeccion('red', { ...this.red, gatewayPrincipal: v });
  }
  setIntervaloEscaneo(v: number): void {
    this.configSvc.editarSeccion('red', { ...this.red, intervaloEscaneoSeg: v });
  }

  // —— Monitoreo ——
  get monitoreo() {
    return this.configSvc.valorActual('monitoreo');
  }
  toggleTrafico(v: boolean): void {
    this.configSvc.editarSeccion('monitoreo', { ...this.monitoreo, simularTraficoEnVivo: v });
  }
  toggleTopologia(v: boolean): void {
    this.configSvc.editarSeccion('monitoreo', { ...this.monitoreo, mostrarTopologiaAnimada: v });
  }
  setRefresco(v: number): void {
    this.configSvc.editarSeccion('monitoreo', { ...this.monitoreo, refrescoDashboardSeg: v });
  }

  // —— Alertas ——
  get alertas() {
    return this.configSvc.valorActual('alertas');
  }
  toggleToast(v: boolean): void {
    this.configSvc.editarSeccion('alertas', { ...this.alertas, notificacionesToast: v });
  }
  toggleSonido(v: boolean): void {
    this.configSvc.editarSeccion('alertas', { ...this.alertas, sonidoAlertas: v });
  }
  toggleUmbral(v: boolean): void {
    this.configSvc.editarSeccion('alertas', { ...this.alertas, umbralCriticoAuto: v });
  }

  // —— Simulación ——
  get simulacion() {
    return this.configSvc.valorActual('simulacion');
  }
  toggleLogsAuto(v: boolean): void {
    this.configSvc.editarSeccion('simulacion', { ...this.simulacion, generarLogsAutomaticos: v });
  }
  toggleAutoCuarentena(v: boolean): void {
    this.configSvc.editarSeccion('simulacion', { ...this.simulacion, autoCuarentena: v });
  }
  setFrecuencia(v: number): void {
    this.configSvc.editarSeccion('simulacion', { ...this.simulacion, frecuenciaEventosSeg: v });
  }

  setSensibilidad(s: SensibilidadDeteccion): void {
    this.configSvc.editar({ sensibilidad: s });
  }

  setTema(t: TemaId): void {
    this.themeSvc.setTema(t);
  }

  aplicar(): void {
    if (!this.puedeEditar()) return;
    this.configSvc.aplicar();
  }

  descartar(): void {
    this.configSvc.descartar();
  }
}
