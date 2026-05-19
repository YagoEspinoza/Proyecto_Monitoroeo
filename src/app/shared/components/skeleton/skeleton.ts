import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  template: `
    <div
      class="skeleton"
      [class.skeleton-text]="variant === 'text'"
      [class.skeleton-card]="variant === 'card'"
      [class.skeleton-circle]="variant === 'circle'"
      [style.width]="width"
      [style.height]="height"
      [attr.aria-hidden]="true">
    </div>
  `,
  styles: [`
    .skeleton {
      background: linear-gradient(
        90deg,
        var(--bg-elevated) 25%,
        rgba(56, 189, 248, 0.08) 50%,
        var(--bg-elevated) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.4s ease infinite;
      border-radius: var(--radius-sm);
    }
    .skeleton-text { height: 14px; margin-bottom: 8px; }
    .skeleton-card { height: 120px; border-radius: var(--radius-md); }
    .skeleton-circle { border-radius: 50%; width: 40px; height: 40px; }
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `]
})
export class SkeletonComponent {
  @Input() variant: 'text' | 'card' | 'circle' = 'text';
  @Input() width = '100%';
  @Input() height = '';
}
