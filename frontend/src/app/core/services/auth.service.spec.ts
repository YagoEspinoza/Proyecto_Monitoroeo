import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from './auth.service';
import { ROLES } from '../constants/roles.constants';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideRouter([
          { path: 'login', children: [] },
          { path: 'vision-general', children: [] },
          { path: '**', redirectTo: 'login' }
        ])
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('debe autenticar administrador con credenciales válidas', () => {
    let ok = false;
    service.login({ correo: 'admin@netguard.com', password: 'Admin1234' }).subscribe({
      next: res => {
        ok = true;
        expect(res.usuario.rol).toBe(ROLES.ADMIN);
        expect(service.estaAutenticado()).toBe(true);
      }
    });
    expect(ok).toBe(true);
  });

  it('debe rechazar credenciales inválidas', () => {
    let failed = false;
    service.login({ correo: 'x@y.com', password: 'bad' }).subscribe({
      error: () => (failed = true)
    });
    expect(failed).toBe(true);
    expect(service.estaAutenticado()).toBe(false);
  });

  it('operador puede aislar pero observador no', () => {
    service.login({ correo: 'operador@netguard.com', password: 'Oper1234' }).subscribe();
    expect(service.puedeAislar()).toBe(true);
    expect(service.puede('config')).toBe(false);

    service.logout();
    service.login({ correo: 'observador@netguard.com', password: 'Obs1234' }).subscribe();
    expect(service.puedeAislar()).toBe(false);
    expect(service.puede('read')).toBe(true);
  });
});
