import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SocAiService } from '../../../core/services/soc-ai.service';

@Component({
  selector: 'app-soc-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    @if (ai.abierto()) {
      <div
        class="ai-backdrop"
        role="presentation"
        (mousedown)="ai.cerrarPorBackdrop()"></div>
      <aside
        class="ai-panel"
        [class.minimized]="ai.minimizado()"
        role="dialog"
        aria-modal="true"
        aria-label="Cyber AI Assistant"
        (mousedown)="$event.stopPropagation()">
        <header class="ai-header">
          <div class="ai-brand">
            <span class="ai-glow">◆</span>
            <div>
              <strong>Cyber AI Assistant</strong>
              <span class="ai-sub">SOC Intelligence · Simulación</span>
            </div>
          </div>
          <div class="ai-actions">
            <button
              type="button"
              class="btn btn-icon btn-outline"
              (click)="ai.toggleMinimizado()"
              [attr.aria-label]="ai.minimizado() ? 'Expandir' : 'Minimizar'">
              {{ ai.minimizado() ? '▢' : '−' }}
            </button>
            <button type="button" class="btn btn-icon btn-outline" (click)="ai.cerrar()" aria-label="Cerrar">
              ✕
            </button>
          </div>
        </header>

        @if (!ai.minimizado()) {
          <section class="ai-tips">
            @for (tip of ai.tips(); track tip.id) {
              <div class="ai-tip" [class.alta]="tip.prioridad === 'alta'">
                <strong>{{ tip.titulo }}</strong>
                <p>{{ tip.texto }}</p>
              </div>
            }
          </section>

          @if (ai.recomendaciones().length) {
            <section class="ai-recs">
              <span class="ai-label">Recomendaciones</span>
              @for (r of ai.recomendaciones(); track r.titulo) {
                <a [routerLink]="r.ruta" class="ai-rec" (click)="cerrarYIr()">
                  <span>{{ r.icono }}</span>
                  <div>
                    <strong>{{ r.titulo }}</strong>
                    <small>{{ r.detalle }}</small>
                  </div>
                </a>
              }
            </section>
          }

          <div class="ai-chat" #chatScroll>
            @for (m of ai.mensajes(); track m.id) {
              <div class="ai-msg" [class]="m.rol">
                <span class="ai-msg-text" [innerHTML]="formatear(m.texto)"></span>
                @if (m.sugerencia) {
                  <a [routerLink]="m.sugerencia.accion" class="ai-sug" (click)="cerrarYIr()">
                    {{ m.sugerencia.etiqueta }} →
                  </a>
                }
              </div>
            }
            @if (ai.escribiendo()) {
              <div class="ai-msg assistant typing">
                <span class="dot"></span><span class="dot"></span><span class="dot"></span>
              </div>
            }
          </div>

          <form class="ai-input" (ngSubmit)="enviar()">
            <input
              #inputRef
              type="text"
              [(ngModel)]="inputText"
              name="aiMsg"
              placeholder="Pregunta sobre alertas, VLANs, ataques..."
              autocomplete="off"
              [disabled]="ai.escribiendo()" />
            <button type="submit" class="btn btn-primary btn-sm" [disabled]="ai.escribiendo() || !inputText.trim()">
              Enviar
            </button>
          </form>
        } @else {
          <p class="ai-minimized-hint">Asistente minimizado — pulsa ▢ para expandir</p>
        }
      </aside>
    }
  `,
  styles: [`
    .ai-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      z-index: 10000;
    }
    .ai-panel {
      position: fixed;
      right: 0;
      top: 0;
      bottom: 0;
      width: min(420px, 100vw);
      max-height: 100vh;
      background: linear-gradient(180deg, var(--bg-sidebar) 0%, var(--bg-surface) 100%);
      border-left: 1px solid rgba(56, 189, 248, 0.3);
      box-shadow: -8px 0 40px rgba(0, 0, 0, 0.35);
      z-index: 10001;
      display: flex;
      flex-direction: column;
      animation: slideInRight 0.28s ease;
    }
    .ai-panel.minimized {
      top: auto;
      bottom: 88px;
      right: 16px;
      width: min(320px, calc(100vw - 32px));
      height: auto;
      max-height: 56px;
      border-radius: var(--radius-md);
      overflow: hidden;
    }
    .ai-minimized-hint {
      padding: 12px 16px;
      margin: 0;
      font-size: 0.78rem;
      color: var(--text-muted);
    }
    .ai-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid var(--border-color);
      background: rgba(56, 189, 248, 0.05);
      flex-shrink: 0;
    }
    .ai-brand { display: flex; gap: 12px; align-items: center; }
    .ai-glow {
      font-size: 1.5rem;
      color: var(--color-brand);
      animation: pulse 2s infinite;
    }
    .ai-sub { font-size: 0.68rem; color: var(--text-muted); display: block; }
    .ai-actions { display: flex; gap: 6px; }
    .ai-tips {
      padding: 10px 14px;
      max-height: 110px;
      overflow-y: auto;
      flex-shrink: 0;
    }
    .ai-tip {
      padding: 8px 10px;
      margin-bottom: 6px;
      border-radius: var(--radius-sm);
      background: var(--bg-elevated);
      font-size: 0.78rem;
      border-left: 3px solid var(--color-info);
    }
    .ai-tip.alta { border-left-color: var(--color-alert); }
    .ai-tip p { margin: 4px 0 0; color: var(--text-secondary); }
    .ai-recs { padding: 0 14px 10px; flex-shrink: 0; }
    .ai-label { font-size: 0.65rem; text-transform: uppercase; color: var(--text-muted); }
    .ai-rec {
      display: flex;
      gap: 10px;
      padding: 8px;
      margin-top: 6px;
      border-radius: var(--radius-sm);
      background: var(--bg-elevated);
      text-decoration: none;
      color: inherit;
    }
    .ai-rec:hover { outline: 1px solid var(--border-glow); }
    .ai-rec small { display: block; color: var(--text-muted); font-size: 0.72rem; }
    .ai-chat {
      flex: 1;
      min-height: 120px;
      overflow-y: auto;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .ai-msg {
      max-width: 92%;
      padding: 10px 12px;
      border-radius: var(--radius-md);
      font-size: 0.82rem;
      line-height: 1.45;
    }
    .ai-msg.user { align-self: flex-end; background: rgba(56, 189, 248, 0.15); border: 1px solid var(--border-glow); }
    .ai-msg.assistant { align-self: flex-start; background: var(--bg-elevated); }
    .ai-msg.system { align-self: center; font-size: 0.72rem; color: var(--text-muted); }
    .ai-sug { display: inline-block; margin-top: 8px; font-size: 0.75rem; color: var(--color-brand); }
    .ai-input {
      display: flex;
      gap: 8px;
      padding: 14px;
      border-top: 1px solid var(--border-color);
      flex-shrink: 0;
    }
    .ai-input input {
      flex: 1;
      padding: 10px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-color);
      background: var(--bg-elevated);
      color: var(--text-primary);
    }
    .ai-input input:disabled { opacity: 0.6; }
    .typing .dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--color-brand);
      margin: 0 2px;
      animation: pulse 1s infinite;
    }
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    html.no-animations .ai-panel { animation: none; }
  `]
})
export class SocAiAssistantComponent implements AfterViewChecked {
  readonly ai = inject(SocAiService);

  @ViewChild('chatScroll') private chatScroll?: ElementRef<HTMLElement>;
  @ViewChild('inputRef') private inputRef?: ElementRef<HTMLInputElement>;

  inputText = '';
  private debeHacerScroll = false;
  private ultimoConteoMensajes = 0;

  @HostListener('document:keydown', ['$event'])
  onEscape(e: KeyboardEvent): void {
    if (e.key === 'Escape' && this.ai.abierto()) {
      e.preventDefault();
      this.ai.cerrar();
    }
  }

  ngAfterViewChecked(): void {
    const count = this.ai.mensajes().length;
    if (this.debeHacerScroll || count !== this.ultimoConteoMensajes) {
      this.scrollAlFinal();
      this.ultimoConteoMensajes = count;
      this.debeHacerScroll = false;
    }
  }

  formatear(texto: string): string {
    return texto
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  enviar(): void {
    const t = this.inputText.trim();
    if (!t || this.ai.escribiendo()) return;
    this.ai.enviarMensaje(t);
    this.inputText = '';
    this.debeHacerScroll = true;
    setTimeout(() => this.inputRef?.nativeElement?.focus(), 0);
  }

  cerrarYIr(): void {
    this.ai.cerrar();
  }

  private scrollAlFinal(): void {
    const el = this.chatScroll?.nativeElement;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }
}
