import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { ThemeService } from '../../../core/services/theme.service';
import { UxPreferencesService } from '../../../core/services/ux-preferences.service';
import { HelpService } from '../../../core/services/help.service';
import { ROLES, RolUsuario } from '../../../core/constants/roles.constants';
import { APP_ROUTES } from '../../../core/constants/routes.constants';
import { ColorAcento, TemaId, TamanoFuente, IdiomaMock } from '../../../core/models/ux.models';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    @if (abierto()) {
      <div class="up-backdrop" (click)="cerrar()"></div>
      <div class="up-dropdown" role="menu">
        <div class="up-profile">
          <span class="up-avatar-lg">{{ profile.avatarMostrado() }}</span>
          <div>
            <strong>{{ profile.nombreMostrado() }}</strong>
            <span class="up-role">{{ profile.rolMostrado() }}</span>
          </div>
        </div>

        <nav class="up-tabs">
          <button type="button" [class.active]="tab() === 'perfil'" (click)="tab.set('perfil')">Perfil</button>
          <button type="button" [class.active]="tab() === 'tema'" (click)="tab.set('tema')">Tema</button>
          <button type="button" [class.active]="tab() === 'ux'" (click)="tab.set('ux')">UX</button>
        </nav>

        <div class="up-body">
          @switch (tab()) {
            @case ('perfil') {
              <label class="up-field">
                Nombre
                <input type="text" [(ngModel)]="nombreEdit" (blur)="guardarNombre()" />
              </label>
              <span class="up-label">Avatar</span>
              <div class="avatar-grid">
                @for (a of profile.avataresDisponibles; track a) {
                  <button type="button" class="av-btn" [class.active]="profile.perfil().avatar === a" (click)="profile.setAvatar(a)">{{ a }}</button>
                }
              </div>
              <span class="up-label">Rol simulado</span>
              <div class="role-btns">
                <button type="button" class="btn btn-sm btn-outline" (click)="profile.setRolSimulado(ROLES.ADMIN)">Admin</button>
                <button type="button" class="btn btn-sm btn-outline" (click)="profile.setRolSimulado(ROLES.ANALISTA)">Analista</button>
                <button type="button" class="btn btn-sm btn-outline" (click)="profile.setRolSimulado(ROLES.OPERADOR)">Operador</button>
                <button type="button" class="btn btn-sm btn-outline" (click)="profile.setRolSimulado(null)">Restaurar</button>
              </div>
            }
            @case ('tema') {
              <span class="up-label">Tema visual</span>
              <div class="theme-grid">
                @for (t of theme.temas; track t.id) {
                  <button type="button" class="theme-opt" [class.active]="theme.prefs().tema === t.id" (click)="theme.setTema(t.id)">
                    {{ t.icon }} {{ t.label }}
                  </button>
                }
              </div>
              <span class="up-label">Color principal</span>
              <div class="accent-row">
                @for (a of theme.acentos; track a.id) {
                  <button
                    type="button"
                    class="accent-dot"
                    [style.background]="a.hex"
                    [class.active]="theme.prefs().acento === a.id"
                    [title]="a.label"
                    (click)="theme.setAcento(a.id)"></button>
                }
              </div>
            }
            @case ('ux') {
              <label class="up-toggle">
                <input type="checkbox" [checked]="ux.prefs().modoCompacto" (change)="ux.setCompacto($any($event.target).checked)" />
                Modo compacto
              </label>
              <label class="up-toggle">
                <input type="checkbox" [checked]="ux.prefs().animaciones" (change)="ux.setAnimaciones($any($event.target).checked)" />
                Animaciones
              </label>
              <label class="up-toggle">
                <input type="checkbox" [checked]="ux.prefs().sonidosAlerta" (change)="ux.setSonidos($any($event.target).checked)" />
                Sonidos de alerta
              </label>
              <label class="up-field">
                Tamaño de fuente
                <select [value]="ux.prefs().tamanoFuente" (change)="ux.setTamanoFuente($any($event.target).value)">
                  <option value="sm">Pequeña</option>
                  <option value="md">Normal</option>
                  <option value="lg">Grande</option>
                </select>
              </label>
              <label class="up-field">
                Idioma (mock)
                <select [value]="ux.prefs().idioma" (change)="ux.setIdioma($any($event.target).value)">
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </label>
            }
          }
        </div>

        <footer class="up-footer">
          <a [routerLink]="['/', routes.CONFIGURACION]" class="btn btn-outline btn-sm" (click)="cerrar()">Configuración</a>
          <button type="button" class="btn btn-outline btn-sm" (click)="help.abrir()">Ayuda</button>
          <button type="button" class="btn btn-danger btn-sm" (click)="salir()">Cerrar sesión</button>
        </footer>
      </div>
    }
  `,
  styles: [`
    .up-backdrop { position: fixed; inset: 0; z-index: 9995; }
    .up-dropdown {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: 320px;
      max-height: min(85vh, 560px);
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
      z-index: 9996;
      display: flex;
      flex-direction: column;
      animation: fadeIn 0.2s ease;
    }
    .up-profile {
      display: flex;
      gap: 12px;
      padding: 16px;
      border-bottom: 1px solid var(--border-color);
    }
    .up-avatar-lg {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--bg-elevated);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      border: 1px solid var(--border-glow);
    }
    .up-role { font-size: 0.72rem; color: var(--text-muted); display: block; }
    .up-tabs { display: flex; border-bottom: 1px solid var(--border-color); }
    .up-tabs button {
      flex: 1; padding: 8px; border: none; background: transparent;
      color: var(--text-muted); cursor: pointer; font-size: 0.75rem;
    }
    .up-tabs button.active { color: var(--color-brand); border-bottom: 2px solid var(--color-brand); }
    .up-body { padding: 14px; overflow-y: auto; flex: 1; }
    .up-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; font-size: 0.78rem; color: var(--text-secondary); }
    .up-field input, .up-field select {
      padding: 8px; border-radius: var(--radius-sm);
      border: 1px solid var(--border-color); background: var(--bg-elevated); color: var(--text-primary);
    }
    .up-toggle { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; font-size: 0.82rem; cursor: pointer; }
    .up-label { font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); display: block; margin: 8px 0 6px; }
    .avatar-grid { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
    .av-btn {
      width: 36px; height: 36px; border-radius: 8px; border: 1px solid var(--border-color);
      background: var(--bg-elevated); cursor: pointer; font-size: 1rem;
    }
    .av-btn.active { border-color: var(--color-brand); }
    .role-btns { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
    .theme-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 12px; }
    .theme-opt {
      padding: 8px; font-size: 0.72rem; border-radius: var(--radius-sm);
      border: 1px solid var(--border-color); background: var(--bg-elevated);
      color: var(--text-secondary); cursor: pointer; text-align: left;
    }
    .theme-opt.active { border-color: var(--color-brand); color: var(--text-primary); }
    .accent-row { display: flex; gap: 8px; margin-bottom: 8px; }
    .accent-dot {
      width: 28px; height: 28px; border-radius: 50%; border: 2px solid transparent; cursor: pointer;
    }
    .accent-dot.active { border-color: var(--text-primary); box-shadow: 0 0 0 2px var(--bg-app); }
    .up-footer {
      display: flex; flex-wrap: wrap; gap: 8px; padding: 12px;
      border-top: 1px solid var(--border-color);
    }
  `]
})
export class UserPanelComponent {
  readonly auth = inject(AuthService);
  readonly profile = inject(UserProfileService);
  readonly theme = inject(ThemeService);
  readonly ux = inject(UxPreferencesService);
  readonly help = inject(HelpService);
  readonly routes = APP_ROUTES;
  readonly ROLES = ROLES;

  readonly abierto = signal(false);
  readonly tab = signal<'perfil' | 'tema' | 'ux'>('perfil');
  nombreEdit = '';

  toggle(): void {
    if (!this.abierto()) {
      this.nombreEdit = this.profile.nombreMostrado();
    }
    this.abierto.update(v => !v);
  }

  cerrar(): void {
    this.abierto.set(false);
  }

  guardarNombre(): void {
    if (this.nombreEdit.trim()) {
      this.profile.setNombre(this.nombreEdit);
    }
  }

  salir(): void {
    this.cerrar();
    this.auth.logout();
  }
}
