import { Injectable, signal } from '@angular/core';

export interface ConfirmOptions {
  titulo: string;
  mensaje: string;
  confirmarTexto?: string;
  cancelarTexto?: string;
  peligro?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  readonly visible = signal(false);
  readonly opciones = signal<ConfirmOptions | null>(null);

  private resolver: ((ok: boolean) => void) | null = null;

  confirmar(opts: ConfirmOptions): Promise<boolean> {
    this.opciones.set({
      confirmarTexto: 'Confirmar',
      cancelarTexto: 'Cancelar',
      ...opts
    });
    this.visible.set(true);
    return new Promise<boolean>(resolve => {
      this.resolver = resolve;
    });
  }

  aceptar(): void {
    this.resolver?.(true);
    this.cerrar();
  }

  cancelar(): void {
    this.resolver?.(false);
    this.cerrar();
  }

  private cerrar(): void {
    this.visible.set(false);
    this.opciones.set(null);
    this.resolver = null;
  }
}
