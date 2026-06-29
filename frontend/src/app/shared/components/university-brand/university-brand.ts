import { Component, Input } from '@angular/core';
import {
  UNIVERSIDAD_ESLOGAN,
  UNIVERSIDAD_NOMBRE_COMPLETO,
  UNIVERSIDAD_PAIS,
  UNIVERSIDAD_ROOSEVELT
} from '../../../core/constants/branding.constants';

export type UniversityBrandVariant = 'banner' | 'sidebar' | 'hero' | 'footer' | 'compact';

@Component({
  selector: 'app-university-brand',
  standalone: true,
  template: `
    @switch (variant) {
      @case ('banner') {
        <div class="ur-banner" role="banner">
          <div class="ur-banner-inner">
            <div class="ur-emblem" aria-hidden="true">UR</div>
            <div class="ur-banner-text">
              <strong>{{ nombreCompleto }}</strong>
              <span>{{ eslogan }}</span>
            </div>
            <div class="ur-banner-flag" aria-hidden="true">🇵🇪</div>
          </div>
        </div>
      }
      @case ('sidebar') {
        <div class="ur-sidebar" role="banner">
          <div class="ur-emblem ur-emblem-lg" aria-hidden="true">UR</div>
          <div class="ur-sidebar-text">
            <strong>{{ universidad }}</strong>
            <em>{{ pais }}</em>
            <span class="ur-app-name">NetGuard SOC</span>
          </div>
        </div>
      }
      @case ('hero') {
        <div class="ur-hero" role="banner">
          <div class="ur-hero-emblem" aria-hidden="true">UR</div>
          <p class="ur-hero-kicker">Institución académica</p>
          <h1 class="ur-hero-title">{{ universidad }}</h1>
          <p class="ur-hero-country">{{ pais }}</p>
          <p class="ur-hero-tagline">{{ eslogan }}</p>
        </div>
      }
      @case ('footer') {
        <footer class="ur-footer" role="contentinfo">
          <span class="ur-footer-emblem" aria-hidden="true">UR</span>
          <span>{{ nombreCompleto }} — {{ eslogan }}</span>
        </footer>
      }
      @case ('compact') {
        <div class="ur-compact" role="banner">
          <span class="ur-compact-emblem" aria-hidden="true">UR</span>
          <strong>{{ nombreCompleto }}</strong>
        </div>
      }
    }
  `,
  styles: [`
    :host { display: block; }

    .ur-emblem {
      flex-shrink: 0;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 0.72rem;
      letter-spacing: -0.04em;
      color: #fff;
      background: linear-gradient(145deg, #b91c1c, #7f1d1d);
      border: 2px solid #fbbf24;
      box-shadow: 0 0 0 1px rgba(251, 191, 36, 0.35);
    }

    .ur-emblem-lg {
      width: 48px;
      height: 48px;
      font-size: 0.85rem;
    }

    .ur-banner {
      background: linear-gradient(90deg, #7f1d1d 0%, #991b1b 35%, #b45309 100%);
      border-bottom: 2px solid #fbbf24;
      flex-shrink: 0;
    }

    .ur-banner-inner {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 10px 20px;
      max-width: 100%;
    }

    .ur-banner-text {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
      flex: 1;
    }

    .ur-banner-text strong {
      font-size: 1rem;
      font-weight: 700;
      color: #fff;
      letter-spacing: 0.01em;
      line-height: 1.2;
    }

    .ur-banner-text span {
      font-size: 0.72rem;
      color: rgba(255, 255, 255, 0.88);
      letter-spacing: 0.02em;
    }

    .ur-banner-flag {
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .ur-sidebar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 4px 0 2px;
    }

    .ur-sidebar-text {
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
    }

    .ur-sidebar-text strong {
      font-size: 0.92rem;
      font-weight: 700;
      color: #fef3c7;
      line-height: 1.2;
    }

    .ur-sidebar-text em {
      font-style: normal;
      font-size: 0.78rem;
      font-weight: 600;
      color: #fbbf24;
      letter-spacing: 0.03em;
    }

    .ur-app-name {
      font-size: 0.62rem;
      color: var(--text-muted);
      font-family: var(--font-mono);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-top: 2px;
    }

    .ur-hero {
      text-align: center;
      padding: 0 12px 8px;
    }

    .ur-hero-emblem {
      width: 72px;
      height: 72px;
      margin: 0 auto 14px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.35rem;
      color: #fff;
      background: linear-gradient(145deg, #b91c1c, #7f1d1d);
      border: 3px solid #fbbf24;
      box-shadow: 0 8px 24px rgba(185, 28, 28, 0.35);
    }

    .ur-hero-kicker {
      margin: 0 0 6px;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: #fbbf24;
      font-weight: 600;
    }

    .ur-hero-title {
      margin: 0;
      font-size: 1.55rem;
      font-weight: 800;
      color: #fef3c7;
      line-height: 1.15;
      letter-spacing: -0.02em;
    }

    .ur-hero-country {
      margin: 4px 0 10px;
      font-size: 1.1rem;
      font-weight: 700;
      color: #fbbf24;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .ur-hero-tagline {
      margin: 0;
      font-size: 0.78rem;
      color: var(--text-secondary);
      line-height: 1.45;
      max-width: 320px;
      margin-inline: auto;
    }

    .ur-footer {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 10px 16px;
      font-size: 0.72rem;
      color: var(--text-muted);
      border-top: 1px solid var(--border-color);
      background: var(--bg-elevated);
      text-align: center;
      flex-shrink: 0;
    }

    .ur-footer-emblem {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.55rem;
      font-weight: 800;
      color: #fff;
      background: linear-gradient(145deg, #b91c1c, #7f1d1d);
      border: 1px solid #fbbf24;
      flex-shrink: 0;
    }

    .ur-compact {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      margin-bottom: 16px;
      border-radius: var(--radius-sm);
      background: linear-gradient(90deg, rgba(127, 29, 29, 0.25), rgba(180, 83, 9, 0.15));
      border: 1px solid rgba(251, 191, 36, 0.35);
    }

    .ur-compact-emblem {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.62rem;
      font-weight: 800;
      color: #fff;
      background: linear-gradient(145deg, #b91c1c, #7f1d1d);
      border: 1px solid #fbbf24;
      flex-shrink: 0;
    }

    .ur-compact strong {
      font-size: 0.85rem;
      color: #fef3c7;
      letter-spacing: 0.01em;
    }

    @media (max-width: 768px) {
      .ur-banner-text span { display: none; }
      .ur-banner-text strong { font-size: 0.88rem; }
      .ur-hero-title { font-size: 1.3rem; }
      .ur-footer span { font-size: 0.65rem; }
    }
  `]
})
export class UniversityBrandComponent {
  @Input() variant: UniversityBrandVariant = 'banner';

  readonly universidad = UNIVERSIDAD_ROOSEVELT;
  readonly pais = UNIVERSIDAD_PAIS;
  readonly nombreCompleto = UNIVERSIDAD_NOMBRE_COMPLETO;
  readonly eslogan = UNIVERSIDAD_ESLOGAN;
}
