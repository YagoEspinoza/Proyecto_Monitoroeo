import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth.service';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [AuthService, provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
  });

  it('debe crear el formulario reactivo', () => {
    expect(fixture.componentInstance.form).toBeTruthy();
    expect(fixture.componentInstance.form.invalid).toBe(true);
  });

  it('debe marcar correo inválido si está vacío', () => {
    fixture.componentInstance.form.controls.correo.markAsTouched();
    expect(fixture.componentInstance.campoInvalido('correo')).toBe(true);
  });
});
