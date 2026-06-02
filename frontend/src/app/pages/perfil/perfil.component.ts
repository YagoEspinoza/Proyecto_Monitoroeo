import { Component, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UserProfileService } from '../../core/services/user-profile.service';
import { UserActivityService } from '../../core/services/user-activity.service';
import { AuditTrailService } from '../../core/services/audit-trail.service';
import { NotificationService } from '../../core/services/notification.service';
import { PageShellComponent } from '../../shared/components/page-shell/page-shell';
import { ETIQUETAS_ROL, ROLES } from '../../core/constants/roles.constants';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, PageShellComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.css'
})
export class PerfilComponent {
  readonly auth = inject(AuthService);
  readonly profile = inject(UserProfileService);
  readonly activity = inject(UserActivityService);
  readonly audit = inject(AuditTrailService);
  readonly notif = inject(NotificationService);
  readonly ROLES = ROLES;
  readonly etiquetas = ETIQUETAS_ROL;

  readonly tab = signal<'perfil' | 'password' | 'actividad' | 'auditoria'>('perfil');
  readonly cambiandoPass = signal(false);

  nombreEdit = this.profile.nombreMostrado();
  passActual = '';
  passNueva = '';
  passConfirm = '';

  guardarNombre(): void {
    this.profile.setNombre(this.nombreEdit);
    this.audit.registrar('perfil', 'USUARIO', 'Nombre de perfil actualizado');
  }

  cambiarPassword(): void {
    if (this.passNueva !== this.passConfirm) {
      this.notif.error('Error', 'Las contraseñas no coinciden');
      return;
    }
    if (this.passNueva.length < 6) {
      this.notif.error('Error', 'Mínimo 6 caracteres');
      return;
    }
    this.cambiandoPass.set(true);
    this.auth
      .cambiarPassword(this.passActual, this.passNueva)
      .pipe(finalize(() => this.cambiandoPass.set(false)))
      .subscribe({
        next: () => {
          this.notif.success('Contraseña actualizada');
          this.audit.registrar('perfil', 'USUARIO', 'Contraseña cambiada', true);
          this.passActual = '';
          this.passNueva = '';
          this.passConfirm = '';
        },
        error: err => this.notif.error('Error', this.auth.mensajeErrorLogin(err))
      });
  }
}
