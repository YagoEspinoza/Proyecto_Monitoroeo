import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { APP_ROUTES } from '../../core/constants/routes.constants';
import { AuthService } from '../../core/services/auth.service';
import { UniversityBrandComponent } from '../../shared/components/university-brand/university-brand';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, UniversityBrandComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly mostrarPassword = signal(false);
  readonly cargando = signal(false);
  readonly error = signal('');

  readonly form = this.fb.nonNullable.group({
    correo: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(64)]]
  });

  togglePassword(): void {
    this.mostrarPassword.update(v => !v);
  }

  iniciarSesion(): void {
    this.error.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Revisa los campos del formulario.');
      return;
    }

    this.cargando.set(true);
    const { correo, password } = this.form.getRawValue();

    this.auth
      .login({ correo: correo.trim(), password })
      .pipe(finalize(() => this.cargando.set(false)))
      .subscribe({
        next: () => void this.router.navigate(['/', APP_ROUTES.VISION_GENERAL]),
        error: err => this.error.set(this.auth.mensajeErrorLogin(err))
      });
  }

  campoInvalido(campo: 'correo' | 'password'): boolean {
    const c = this.form.controls[campo];
    return c.invalid && (c.dirty || c.touched);
  }
}
