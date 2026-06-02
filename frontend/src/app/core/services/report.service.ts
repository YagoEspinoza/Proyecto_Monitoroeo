import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  CreateReportPayload,
  NetworkReport,
  ReportFilters,
  UpdateReportPayload
} from '../models/report.model';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/reports`;

  getReports(filters: ReportFilters = {}): Observable<NetworkReport[]> {
    return this.http
      .get<NetworkReport[]>(this.baseUrl, { params: this.toParams(filters) })
      .pipe(catchError(err => throwError(() => this.mapError(err))));
  }

  getReportById(id: string): Observable<NetworkReport> {
    return this.http
      .get<NetworkReport>(`${this.baseUrl}/${id}`)
      .pipe(catchError(err => throwError(() => this.mapError(err))));
  }

  createReport(report: CreateReportPayload): Observable<NetworkReport> {
    return this.http
      .post<NetworkReport>(this.baseUrl, report)
      .pipe(catchError(err => throwError(() => this.mapError(err))));
  }

  updateReport(id: string, report: UpdateReportPayload): Observable<NetworkReport> {
    return this.http
      .put<NetworkReport>(`${this.baseUrl}/${id}`, report)
      .pipe(catchError(err => throwError(() => this.mapError(err))));
  }

  deleteReport(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(err => throwError(() => this.mapError(err))));
  }

  downloadPdf(id: string): Observable<Blob> {
    return this.http
      .get(`${this.baseUrl}/${id}/pdf`, { responseType: 'blob' })
      .pipe(catchError(err => throwError(() => this.mapError(err))));
  }

  private toParams(filters: ReportFilters): HttpParams {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return params;
  }

  private mapError(error: HttpErrorResponse): Error {
    if (error.status === 0) {
      return new Error(
        'No se pudo conectar con el servidor de reportes. Verifique que MongoDB y el backend estén activos.'
      );
    }
    const body = error.error as { message?: string } | null;
    return new Error(body?.message ?? `Error del servidor (${error.status})`);
  }
}
