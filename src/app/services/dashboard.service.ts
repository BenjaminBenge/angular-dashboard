import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { DashboardData, INITIAL_DATA } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly dataUrl = 'assets/dashboard-data.json';

  getData(): Observable<DashboardData> {
    return this.http.get<DashboardData>(this.dataUrl).pipe(
      catchError(() => of(INITIAL_DATA))
    );
  }
}
