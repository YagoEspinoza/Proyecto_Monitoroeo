import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkService, SecurityEvent } from '../services/network';
import { RouterModule } from '@angular/router'; // <-- AGREGAR ESTO

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule], // <-- AGREGAR AQUÍ TAMBIÉN
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  routerStatus: any;
  securityAlerts: SecurityEvent[] = [];

  constructor(private networkService: NetworkService) {}

  ngOnInit(): void {
    this.networkService.getRouterStatus().subscribe(status => {
      this.routerStatus = status;
    });

    this.networkService.getSecurityAlerts().subscribe(alerts => {
      this.securityAlerts = alerts;
    });
  }
}