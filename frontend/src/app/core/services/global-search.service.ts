import { Injectable, computed, inject, signal } from '@angular/core';
import { ResultadoBusqueda } from '../models/search.models';
import { MockNetworkService } from './mock-network.service';
import { SecurityPolicyService } from './security-policy.service';
import { SocEventService } from './soc-event.service';
import { APP_ROUTES, PAGE_TITLES } from '../constants/routes.constants';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class GlobalSearchService {
  private readonly mock = inject(MockNetworkService);
  private readonly policies = inject(SecurityPolicyService);
  private readonly events = inject(SocEventService);
  private readonly auth = inject(AuthService);

  readonly abierto = signal(false);
  readonly query = signal('');

  readonly resultados = computed(() => this.buscar(this.query()));

  abrir(): void {
    this.abierto.set(true);
    this.query.set('');
  }

  cerrar(): void {
    this.abierto.set(false);
    this.query.set('');
  }

  toggle(): void {
    if (this.abierto()) this.cerrar();
    else this.abrir();
  }

  private buscar(q: string): ResultadoBusqueda[] {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return this.resultadosRecientes();

    const out: ResultadoBusqueda[] = [];

    for (const [ruta, titulo] of Object.entries(PAGE_TITLES)) {
      if (titulo.toLowerCase().includes(term) || ruta.includes(term)) {
        out.push({
          id: `page-${ruta}`,
          tipo: 'pagina',
          titulo,
          subtitulo: 'Navegación',
          ruta: `/${ruta}`,
          icono: '◈'
        });
      }
    }

    this.mock.dispositivos().forEach(d => {
      if (
        d.nombre.toLowerCase().includes(term) ||
        d.ip.includes(term) ||
        d.mac.toLowerCase().includes(term)
      ) {
        out.push({
          id: `dev-${d.id}`,
          tipo: 'dispositivo',
          titulo: d.nombre,
          subtitulo: d.ip,
          ruta: `/${APP_ROUTES.DISPOSITIVOS}`,
          icono: '⊞',
          meta: d.seguridad
        });
      }
    });

    this.mock.vlans().forEach(v => {
      if (v.nombre.toLowerCase().includes(term) || String(v.id).includes(term)) {
        out.push({
          id: `vlan-${v.id}`,
          tipo: 'vlan',
          titulo: `VLAN ${v.id} — ${v.nombre}`,
          subtitulo: v.rango,
          ruta: `/${APP_ROUTES.VLANS}`,
          icono: '⇄'
        });
      }
    });

    this.mock.alertas().forEach(a => {
      if (a.id.toLowerCase().includes(term) || a.mensaje.toLowerCase().includes(term)) {
        out.push({
          id: `alt-${a.id}`,
          tipo: 'alerta',
          titulo: a.id,
          subtitulo: a.mensaje.slice(0, 60),
          ruta: `/${APP_ROUTES.ALERTAS}`,
          icono: '⚠',
          meta: a.nivel
        });
      }
    });

    this.policies.politicas().forEach(p => {
      if (p.nombre.toLowerCase().includes(term) || p.descripcion.toLowerCase().includes(term)) {
        out.push({
          id: `pol-${p.id}`,
          tipo: 'politica',
          titulo: p.nombre,
          subtitulo: p.descripcion.slice(0, 50),
          ruta: `/${APP_ROUTES.POLITICAS}`,
          icono: '⊛'
        });
      }
    });

    this.events.eventos().forEach(l => {
      if (l.mensaje.toLowerCase().includes(term) || l.modulo.toLowerCase().includes(term)) {
        out.push({
          id: `log-${l.id}`,
          tipo: 'log',
          titulo: `[${l.modulo}] ${l.nivel}`,
          subtitulo: l.mensaje.slice(0, 55),
          ruta: `/${APP_ROUTES.AUDITORIA}`,
          icono: '≡'
        });
      }
    });

    const usuarios = [
      { correo: 'admin@netguard.com', nombre: 'Administrador' },
      { correo: 'operador@netguard.com', nombre: 'Operador SOC' },
      { correo: 'analista@netguard.com', nombre: 'Analista SOC' }
    ];
    usuarios.forEach(u => {
      if (u.nombre.toLowerCase().includes(term) || u.correo.includes(term)) {
        out.push({
          id: `usr-${u.correo}`,
          tipo: 'usuario',
          titulo: u.nombre,
          subtitulo: u.correo,
          ruta: `/${APP_ROUTES.PERFIL}`,
          icono: '👤'
        });
      }
    });

    return out.slice(0, 12);
  }

  private resultadosRecientes(): ResultadoBusqueda[] {
    return [
      {
        id: 'r1',
        tipo: 'pagina',
        titulo: 'Dashboard SOC',
        subtitulo: 'Visión general',
        ruta: `/${APP_ROUTES.VISION_GENERAL}`,
        icono: '◈'
      },
      {
        id: 'r2',
        tipo: 'pagina',
        titulo: 'Mapa de Red',
        subtitulo: 'Topología interactiva',
        ruta: `/${APP_ROUTES.TOPOLOGIA}`,
        icono: '◎'
      },
      {
        id: 'r3',
        tipo: 'pagina',
        titulo: 'Simulación de Ataques',
        subtitulo: 'Laboratorio SOC',
        ruta: `/${APP_ROUTES.SIMULACION}`,
        icono: '⚡'
      }
    ];
  }
}
