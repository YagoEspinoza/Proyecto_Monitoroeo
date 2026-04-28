import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionGeneral } from './vision-general';

describe('VisionGeneral', () => {
  let component: VisionGeneral;
  let fixture: ComponentFixture<VisionGeneral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisionGeneral],
    }).compileComponents();

    fixture = TestBed.createComponent(VisionGeneral);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
