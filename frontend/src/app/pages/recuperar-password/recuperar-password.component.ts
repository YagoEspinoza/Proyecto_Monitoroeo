import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { APP_ROUTES } from '../../core/constants/routes.constants';
import { UniversityBrandComponent } from '../../shared/components/university-brand/university-brand';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, UniversityBrandComponent],
  templateUrl: './recuperar-password.component.html',
  styleUrl: './recuperar-password.css'
})
export class RecuperarPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly routes = APP_ROUTES;

  readonly cargando = signal(false);
  readonly enviado = signal(false);
  readonly error = signal('');

  readonly form = this.fb.nonNullable.group({
    correo: ['', [Validators.required, Validators.email]]
  });

  enviar(): void {
    this.error.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.cargando.set(true);
    this.auth
      .recuperarPasswordMock(this.form.controls.correo.value)
      .pipe(finalize(() => this.cargando.set(false)))
      .subscribe({
        next: () => this.enviado.set(true),
        error: err => this.error.set(this.auth.mensajeErrorLogin(err))
      });
  }

  volverLogin(): void {
    void this.router.navigate([`/${APP_ROUTES.LOGIN}`]);
  }
}
