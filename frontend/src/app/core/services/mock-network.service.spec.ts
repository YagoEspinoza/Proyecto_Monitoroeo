import { TestBed } from '@angular/core/testing';
import { MockNetworkService } from './mock-network.service';

describe('MockNetworkService', () => {
  let service: MockNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MockNetworkService] });
    service = TestBed.inject(MockNetworkService);
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  it('debe exponer dispositivos y métricas iniciales', () => {
    expect(service.dispositivos().length).toBeGreaterThan(0);
    expect(service.metricas().dispositivosTotal).toBe(service.dispositivos().length);
  });

  it('debe aislar dispositivo en VLAN 999', () => {
    const target = service.dispositivos().find(d => d.seguridad === 'intruso');
    expect(target).toBeTruthy();
    service.aislarDispositivo(target!.id);
    const aislado = service.dispositivos().find(d => d.id === target!.id);
    expect(aislado?.vlan).toBe(999);
    expect(aislado?.seguridad).toBe('aislado');
  });

  it('debe reconocer alerta por id', () => {
    const alerta = service.alertas().find(a => !a.reconocida);
    expect(alerta).toBeTruthy();
    service.reconocerAlerta(alerta!.id);
    expect(service.alertas().find(a => a.id === alerta!.id)?.reconocida).toBe(true);
  });
});
