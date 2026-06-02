import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBadgeComponent } from './status-badge';

describe('StatusBadgeComponent', () => {
  let fixture: ComponentFixture<StatusBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBadgeComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(StatusBadgeComponent);
  });

  it('debe renderizar etiqueta de estado seguro', () => {
    fixture.componentRef.setInput('estado', 'seguro');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Seguro');
  });

  it('debe aplicar clase badge-intruso', () => {
    fixture.componentRef.setInput('estado', 'intruso');
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.badge-intruso');
    expect(badge).toBeTruthy();
  });
});
