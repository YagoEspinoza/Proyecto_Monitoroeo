import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Topologia } from './topologia';

describe('Topologia', () => {
  let component: Topologia;
  let fixture: ComponentFixture<Topologia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Topologia],
    }).compileComponents();

    fixture = TestBed.createComponent(Topologia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
