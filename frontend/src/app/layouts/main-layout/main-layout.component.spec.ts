import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { AuthService } from '../../core/services/auth.service';
import { MockNetworkService } from '../../core/services/mock-network.service';

describe('MainLayoutComponent', () => {
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutComponent],
      providers: [AuthService, MockNetworkService, provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(MainLayoutComponent);
    fixture.detectChanges();
  });

  it('debe crear el layout principal', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
