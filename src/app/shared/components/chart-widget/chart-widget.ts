import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
  inject
} from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { MockNetworkService } from '../../../core/services/mock-network.service';

Chart.register(...registerables);

@Component({
  selector: 'app-chart-widget',
  standalone: true,
  template: `<canvas #canvas></canvas>`,
  styles: [`:host { display: block; height: 200px; } canvas { width: 100% !important; height: 100% !important; }`]
})
export class ChartWidgetComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input({ required: true }) tipo!: 'trafico' | 'alertas' | 'uptime';

  private readonly mock = inject(MockNetworkService);
  private chart?: Chart;
  private interval?: ReturnType<typeof setInterval>;

  ngAfterViewInit(): void {
    this.crearChart();
    this.interval = setInterval(() => this.actualizar(), 4000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    this.chart?.destroy();
  }

  private crearChart(): void {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const cfg = this.config();
    this.chart = new Chart(ctx, cfg);
  }

  private actualizar(): void {
    if (!this.chart) return;
    const cfg = this.config();
    this.chart.data = cfg.data!;
    this.chart.update('none');
  }

  private config(): ChartConfiguration {
    const labels = ['-5m', '-4m', '-3m', '-2m', '-1m', 'Ahora'];
    const brand = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-brand')
      .trim() || '#38bdf8';

    if (this.tipo === 'trafico') {
      const t = this.mock.metricas().traficoTotalMbps;
      return {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Mbps',
            data: [t - 40, t - 25, t - 15, t - 8, t - 3, t],
            borderColor: brand,
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: this.opts()
      };
    }

    if (this.tipo === 'alertas') {
      const m = this.mock.metricas();
      return {
        type: 'bar',
        data: {
          labels: ['Críticas', 'Pendientes', 'Intrusos', 'Cuarentena'],
          datasets: [{
            data: [m.alertasCriticas, m.alertasPendientes, m.intrusosDetectados, m.enCuarentena],
            backgroundColor: ['#ef4444', '#f59e0b', '#f43f5e', '#6366f1']
          }]
        },
        options: this.opts()
      };
    }

    return {
      type: 'doughnut',
      data: {
        labels: ['Uptime', 'Caída'],
        datasets: [{
          data: [this.mock.metricas().uptimePromedio, 100 - this.mock.metricas().uptimePromedio],
          backgroundColor: [brand, '#1e2a3a']
        }]
      },
      options: {
        ...this.opts(),
        plugins: { legend: { display: true, labels: { color: '#8b9cb3' } } }
      } as ChartConfiguration['options']
    };
  }

  private opts() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: this.tipo !== 'trafico', labels: { color: '#8b9cb3' } } },
      scales:
        this.tipo === 'uptime'
          ? {}
          : {
              x: { ticks: { color: '#5c6b80' }, grid: { color: '#1e2a3a' } },
              y: { ticks: { color: '#5c6b80' }, grid: { color: '#1e2a3a' } }
            }
    };
  }
}
