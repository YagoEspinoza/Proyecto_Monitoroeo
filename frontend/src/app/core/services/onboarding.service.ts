import { Injectable, signal } from '@angular/core';

export interface PasoTour {
  id: string;
  titulo: string;
  texto: string;
  selector?: string;
  ruta?: string;
}

const TOUR_PASOS: PasoTour[] = [
  {
    id: 'welcome',
    titulo: 'Bienvenido a NetGuard SOC',
    texto: 'Plataforma de monitoreo y ciberseguridad en modo simulación. Este tour te guiará por las funciones principales.'
  },
  {
    id: 'dashboard',
    titulo: 'Dashboard SOC',
    texto: 'Métricas en vivo, alertas recientes y estado de la red. Los widgets son personalizables.',
    selector: '#main-content',
    ruta: '/vision-general'
  },
  {
    id: 'search',
    titulo: 'Búsqueda global',
    texto: 'Presiona Ctrl+K en cualquier momento para buscar dispositivos, alertas, logs y más.',
    selector: '.topbar-right'
  },
  {
    id: 'ai',
    titulo: 'Cyber AI Assistant',
    texto: 'El asistente inteligente explica alertas, detecta anomalías y recomienda acciones.',
    selector: '.ai-fab'
  },
  {
    id: 'topo',
    titulo: 'Mapa de red',
    texto: 'Visualiza topología interactiva con estados en tiempo real y detección de amenazas.',
    ruta: '/topologia'
  },
  {
    id: 'sim',
    titulo: 'Laboratorio de ataques',
    texto: 'Simula brute force, DDoS, port scan y más. El IDS reaccionará automáticamente.',
    ruta: '/simulacion-ataques'
  }
];

const STORAGE_KEY = 'ng_onboarding_done';

@Injectable({ providedIn: 'root' })
export class OnboardingService {
  readonly activo = signal(false);
  readonly pasoActual = signal(0);
  readonly pasos = TOUR_PASOS;

  readonly paso = () => this.pasos[this.pasoActual()] ?? null;
  readonly esUltimo = () => this.pasoActual() >= this.pasos.length - 1;

  debeMostrarOnboarding(): boolean {
    return localStorage.getItem(STORAGE_KEY) !== '1';
  }

  iniciar(): void {
    this.pasoActual.set(0);
    this.activo.set(true);
  }

  siguiente(): void {
    if (this.esUltimo()) {
      this.completar();
    } else {
      this.pasoActual.update(i => i + 1);
    }
  }

  anterior(): void {
    this.pasoActual.update(i => Math.max(0, i - 1));
  }

  omitir(): void {
    this.completar();
  }

  completar(): void {
    this.activo.set(false);
    localStorage.setItem(STORAGE_KEY, '1');
  }

  reiniciar(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.iniciar();
  }
}
