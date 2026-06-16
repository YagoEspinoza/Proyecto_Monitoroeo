import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { MockNetworkService } from '../../core/services/mock-network.service';
import { SecurityPolicyService } from '../../core/services/security-policy.service';
import {
  AccionPolitica,
  EstadoPolitica,
  PoliticaSeguridad,
  TipoPolitica
} from '../../core/models/policy.models';
import { ModalComponent } from '../../shared/components/modal/modal';
import { PageShellComponent } from '../../shared/components/page-shell/page-shell';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state';
import { IsoComplianceService } from '../../core/services/iso-compliance.service';
import {
  claseEstadoPolitica,
  etiquetaEstadoPolitica,
  etiquetaTipoPolitica
} from '../../shared/utils/policy-display.utils';

@Component({
  selector: 'app-politicas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalComponent,
    PageShellComponent,
    EmptyStateComponent
  ],
  templateUrl: './politicas.component.html',
  styleUrl: './politicas.css'
})
export class PoliticasComponent {
  private readonly fb = inject(FormBuilder);
  readonly auth = inject(AuthService);
  readonly mock = inject(MockNetworkService);
  readonly policies = inject(SecurityPolicyService);
  readonly iso = inject(IsoComplianceService);

  readonly busqueda = signal('');
  readonly modalAbierto = signal(false);
  readonly editando = signal<PoliticaSeguridad | null>(null);
  readonly sincronizando = signal(false);

  readonly etiquetaEstado = etiquetaEstadoPolitica;
  readonly etiquetaTipo = etiquetaTipoPolitica;
  readonly claseEstado = claseEstadoPolitica;

  readonly vlanOpciones = () => this.mock.vlans().filter(v => v.id !== 999);

  readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(4)]],
    descripcion: ['', Validators.required],
    tipo: ['bloquear_trafico_sospechoso' as TipoPolitica, Validators.required],
    accion: ['bloquear' as AccionPolitica, Validators.required],
    estado: ['activa' as EstadoPolitica],
    vlanIds: ['30'],
    prioridad: [10, [Validators.min(1), Validators.max(99)]]
  });

  listaFiltrada(): PoliticaSeguridad[] {
    const q = this.busqueda().toLowerCase().trim();
    const list = this.policies.politicas();
    if (!q) return list;
    return list.filter(
      p =>
        p.nombre.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q) ||
        p.tipo.includes(q)
    );
  }

  puedeEditar(): boolean {
    return this.auth.puede('write');
  }

  abrirCrear(): void {
    this.editando.set(null);
    this.form.reset({
      nombre: '',
      descripcion: '',
      tipo: 'bloquear_trafico_sospechoso',
      accion: 'bloquear',
      estado: 'activa',
      vlanIds: '30',
      prioridad: 10
    });
    this.modalAbierto.set(true);
  }

  abrirEditar(p: PoliticaSeguridad): void {
    this.editando.set(p);
    this.form.patchValue({
      nombre: p.nombre,
      descripcion: p.descripcion,
      tipo: p.tipo,
      accion: p.accion,
      estado: p.estado,
      vlanIds: p.vlanIds.join(','),
      prioridad: p.prioridad
    });
    this.modalAbierto.set(true);
  }

  guardar(): void {
    if (this.form.invalid || !this.puedeEditar()) return;
    const v = this.form.getRawValue();
    const vlanIds = v.vlanIds
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n));

    const datos = {
      nombre: v.nombre,
      descripcion: v.descripcion,
      tipo: v.tipo,
      accion: v.accion,
      estado: v.estado,
      activa: v.estado !== 'deshabilitada',
      vlanIds,
      prioridad: v.prioridad
    };

    if (this.editando()) {
      this.policies.actualizar(this.editando()!.id, datos);
    } else {
      this.policies.crear(datos);
    }
    this.cerrarModal();
  }

  eliminar(p: PoliticaSeguridad): void {
    if (!this.puedeEditar() || !confirm(`¿Eliminar política "${p.nombre}"?`)) return;
    this.policies.eliminar(p.id);
  }

  toggle(p: PoliticaSeguridad): void {
    if (!this.puedeEditar()) return;
    this.policies.toggleActiva(p.id);
  }

  sincronizar(): void {
    if (!this.puedeEditar()) return;
    this.sincronizando.set(true);
    this.policies.sincronizarReglas();
    setTimeout(() => this.sincronizando.set(false), 1300);
  }

  nombresVlans(ids: number[]): string {
    return ids
      .map(id => this.mock.vlans().find(v => v.id === id)?.nombre ?? `VLAN ${id}`)
      .join(', ');
  }

  cerrarModal(): void {
    this.modalAbierto.set(false);
    this.editando.set(null);
  }
}
