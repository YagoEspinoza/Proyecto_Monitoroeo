import { Component, Input, inject } from '@angular/core';
import { MockNetworkService } from '../../../core/services/mock-network.service';
import { UniversityBrandComponent } from '../university-brand/university-brand';
import { LoaderComponent } from '../loader/loader';
import { SkeletonComponent } from '../skeleton/skeleton';

@Component({
  selector: 'app-page-shell',
  standalone: true,
  imports: [LoaderComponent, SkeletonComponent, UniversityBrandComponent],
  template: `
    @if (mock.cargando()) {
      @if (useSkeleton) {
        <div class="skeleton-page" role="status" aria-label="Cargando contenido">
          <app-skeleton variant="text" width="40%" />
          <app-skeleton variant="text" width="60%" />
          <div class="skeleton-grid">
            @for (i of [1, 2, 3, 4]; track i) {
              <app-skeleton variant="card" />
            }
          </div>
        </div>
      } @else {
        <app-loader [mensaje]="loaderMessage" />
      }
    } @else {
      <app-university-brand variant="compact" />
      <ng-content />
    }
  `,
  styles: [`
    .skeleton-page {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
      margin-top: 8px;
    }
  `]
})
export class PageShellComponent {
  protected readonly mock = inject(MockNetworkService);

  @Input() useSkeleton = false;
  @Input() loaderMessage = 'Cargando datos...';
}
