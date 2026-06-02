import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { APP_ROUTES, PAGE_TITLES } from '../../core/constants/routes.constants';
import { ROLES, RolUsuario } from '../../core/constants/roles.constants';
import { AuthService } from '../../core/services/auth.service';
import { MockNetworkService } from '../../core/services/mock-network.service';
import { NotificationService } from '../../core/services/notification.service';
import { HelpService } from '../../core/services/help.service';
import { UxPreferencesService } from '../../core/services/ux-preferences.service';
import { UserProfileService } from '../../core/services/user-profile.service';
import { GlobalSearchService } from '../../core/services/global-search.service';
import { SocAiService } from '../../core/services/soc-ai.service';
import { OnboardingService } from '../../core/services/onboarding.service';
import { UserActivityService } from '../../core/services/user-activity.service';
import { etiquetaEstadoGlobal } from '../../shared/utils/network-display.utils';
import { ToastContainerComponent } from '../../shared/components/toast-container/toast-container';
import { HelpPanelComponent } from '../../shared/components/help-panel/help-panel';
import { UserPanelComponent } from '../../shared/components/user-panel/user-panel';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog';
import { TooltipDirective } from '../../shared/directives/tooltip.directive';
import { GlobalSearchComponent } from '../../shared/components/global-search/global-search';
import { NotificationCenterComponent } from '../../shared/components/notification-center/notification-center';
import { SocAiAssistantComponent } from '../../shared/components/soc-ai-assistant/soc-ai-assistant';
import { OnboardingTourComponent } from '../../shared/components/onboarding-tour/onboarding-tour';

interface NavItem {
  ruta: string;
  etiqueta: string;
  icono: string;
  badge?: 'alertas' | 'cuarentena';
  roles?: RolUsuario[];
  tip?: string;
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ToastContainerComponent,
    HelpPanelComponent,
    UserPanelComponent,
    ConfirmDialogComponent,
    TooltipDirective,
    GlobalSearchComponent,
    NotificationCenterComponent,
    SocAiAssistantComponent,
    OnboardingTourComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  private readonly router = inject(Router);
  readonly auth = inject(AuthService);
  readonly mock = inject(MockNetworkService);
  readonly notif = inject(NotificationService);
  readonly help = inject(HelpService);
  readonly ux = inject(UxPreferencesService);
  readonly profile = inject(UserProfileService);
  readonly search = inject(GlobalSearchService);
  readonly ai = inject(SocAiService);
  readonly onboarding = inject(OnboardingService);
  private readonly activity = inject(UserActivityService);

  readonly userPanel = viewChild(UserPanelComponent);

  readonly sidebarAbierto = signal(false);
  readonly tituloPagina = signal('Panel de Control');
  readonly escaneando = signal(false);
  readonly metricas = this.mock.metricas;

  readonly navItems: NavItem[] = [
    { ruta: `/${APP_ROUTES.VISION_GENERAL}`, etiqueta: 'Dashboard', icono: '◈', tip: 'Centro de operaciones SOC' },
    { ruta: `/${APP_ROUTES.DISPOSITIVOS}`, etiqueta: 'Dispositivos', icono: '⊞', tip: 'Inventario de hosts' },
    { ruta: `/${APP_ROUTES.ALERTAS}`, etiqueta: 'Alertas IDS', icono: '⚠', badge: 'alertas', tip: 'Detección de intrusos' },
    { ruta: `/${APP_ROUTES.VLANS}`, etiqueta: 'VLANs Activas', icono: '⇄', tip: 'Segmentación de red' },
    {
      ruta: `/${APP_ROUTES.VLAN_CUARENTENA}`,
      etiqueta: 'Cuarentena',
      icono: '⛔',
      badge: 'cuarentena',
      tip: 'Hosts aislados VLAN 999'
    },
    { ruta: `/${APP_ROUTES.TOPOLOGIA}`, etiqueta: 'Mapa de Red', icono: '◎', tip: 'Topología interactiva' },
    {
      ruta: `/${APP_ROUTES.SIMULACION}`,
      etiqueta: 'Simulación',
      icono: '⚡',
      tip: 'Laboratorio de ataques',
      roles: [ROLES.ADMIN, ROLES.OPERADOR, ROLES.ANALISTA]
    },
    { ruta: `/${APP_ROUTES.AUDITORIA}`, etiqueta: 'Logs del Sistema', icono: '≡', tip: 'Auditoría en vivo' },
    { ruta: `/${APP_ROUTES.REPORTES}`, etiqueta: 'Reportes', icono: '↓', tip: 'Eventos de red y PDF' },
    {
      ruta: `/${APP_ROUTES.POLITICAS}`,
      etiqueta: 'Políticas',
      icono: '⊛',
      roles: [ROLES.ADMIN, ROLES.OPERADOR],
      tip: 'Reglas IDS/IPS'
    },
    {
      ruta: `/${APP_ROUTES.CONFIGURACION}`,
      etiqueta: 'Configuración',
      icono: '⚙',
      roles: [ROLES.ADMIN],
      tip: 'Parámetros del sistema'
    }
  ];

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => {
        const segment = e.urlAfterRedirects.split('/').filter(Boolean)[0] ?? APP_ROUTES.VISION_GENERAL;
        this.tituloPagina.set(PAGE_TITLES[segment] ?? 'Panel de Control');
        this.sidebarAbierto.set(false);
        this.activity.registrarNavegacion(e.urlAfterRedirects, PAGE_TITLES[segment] ?? segment);
      });
  }

  ngOnInit(): void {
    if (this.onboarding.debeMostrarOnboarding()) {
      setTimeout(() => this.onboarding.iniciar(), 1200);
    }
  }

  navVisible(item: NavItem): boolean {
    if (!item.roles?.length) return true;
    return this.auth.tieneRol(...item.roles);
  }

  badgeCount(item: NavItem): number | null {
    if (item.badge === 'alertas') return this.metricas().alertasPendientes || null;
    if (item.badge === 'cuarentena') return this.metricas().enCuarentena || null;
    return null;
  }

  toggleSidebar(): void {
    if (window.innerWidth <= 1024) {
      this.sidebarAbierto.update(v => !v);
    } else {
      this.ux.toggleSidebarColapsado();
    }
  }

  sidebarColapsado(): boolean {
    return this.ux.prefs().sidebarColapsado;
  }

  async escanearRed(): Promise<void> {
    if (!this.auth.puede('write')) {
      this.notif.warning('Sin permisos', 'Tu rol no puede ejecutar escaneos.');
      return;
    }
    this.escaneando.set(true);
    try {
      await this.mock.escanearRed();
      this.notif.success('Escaneo completado', '12 hosts respondieron en la red');
    } finally {
      this.escaneando.set(false);
    }
  }

  estadoGlobalClass(): string {
    return 'global-' + this.metricas().estadoGlobal;
  }

  etiquetaEstadoGlobal(): string {
    return etiquetaEstadoGlobal(this.metricas().estadoGlobal);
  }

  toggleUserPanel(): void {
    this.userPanel()?.toggle();
  }

  abrirBusqueda(): void {
    this.search.abrir();
  }

  toggleAi(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    if (this.ai.abierto()) {
      this.ai.cerrar();
      return;
    }
    this.help.cerrar();
    this.search.cerrar();
    this.ai.abrir();
  }

  cerrarSesion(): void {
    this.auth.logout();
  }
}
