import { Injectable, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import {
  HELP_FAQ,
  HELP_GENERAL,
  HELP_POR_RUTA,
  HelpPageContent
} from '../constants/help-content.constants';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class HelpService {
  private readonly router = inject(Router);
  private readonly notif = inject(NotificationService);

  readonly abierto = signal(false);
  readonly tabActiva = signal<'guia' | 'faq' | 'soporte'>('guia');
  readonly rutaActual = signal('vision-general');

  readonly contenidoContextual = computed<HelpPageContent>(() => {
    const seg = this.rutaActual();
    return HELP_POR_RUTA[seg] ?? HELP_GENERAL;
  });

  readonly faq = HELP_FAQ;

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => {
        const seg = e.urlAfterRedirects.split('/').filter(Boolean)[0] ?? 'vision-general';
        this.rutaActual.set(seg);
      });
  }

  toggle(): void {
    this.abierto.update(v => !v);
  }

  abrir(tab?: 'guia' | 'faq' | 'soporte'): void {
    if (tab) this.tabActiva.set(tab);
    this.abierto.set(true);
  }

  cerrar(): void {
    this.abierto.set(false);
  }

  simularTicket(): void {
    const id = `TK-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    this.notif.info('Ticket de soporte simulado', `Referencia: ${id} — respuesta en 24h (mock)`);
    this.tabActiva.set('soporte');
  }
}
