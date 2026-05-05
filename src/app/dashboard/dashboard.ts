import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SocketService } from '../core/services/socket';
import { AuthService } from '../core/services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  wsConectado = signal(false);

  constructor(
    private socketService: SocketService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.socketService.conectar();
    this.wsConectado = this.socketService.conectado;
  }

  ngOnDestroy(): void {
    this.socketService.desconectar();
  }

  cerrarSesion(): void {
    this.authService.logout();
  }
}