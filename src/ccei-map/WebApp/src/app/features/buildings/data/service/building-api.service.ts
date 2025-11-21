import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BuildingMockService } from './building-mock.service';
import { environment } from 'app/environment/enviroment';
import { Building } from 'app/domain/Spaces';

/**
 * Servicio HTTP para operaciones CRUD de Buildings
 * Puede usar Mock o API real según configuración
 */
@Injectable({
  providedIn: 'root',
})
export class BuildingApiService {
  private readonly apiUrl = `${environment.apiUrl}/buildings`;
  private readonly useMock = environment.useMockData; // ← Nueva configuración

  constructor(
    private http: HttpClient,
    private mockService: BuildingMockService,
  ) {
    if (this.useMock) {
      console.log('⚠️ BuildingApiService: Usando MOCK DATA');
    } else {
      console.log('🌐 BuildingApiService: Usando API REAL');
    }
  }

  // ==========================================
  // CRUD BÁSICO
  // ==========================================

  getAll(): Observable<Building[]> {
    if (this.useMock) {
      return this.mockService.getAll();
    }
    return this.http.get<Building[]>(this.apiUrl);
  }

  getById(id: string): Observable<Building> {
    if (this.useMock) {
      return this.mockService.getById(id);
    }
    return this.http.get<Building>(`${this.apiUrl}/${id}`);
  }

  getWithSpaces(id: string): Observable<Building> {
    if (this.useMock) {
      return this.mockService.getWithSpaces(id);
    }
    return this.http.get<Building>(`${this.apiUrl}/${id}/with-spaces`);
  }

  create(building: Partial<Building>): Observable<Building> {
    if (this.useMock) {
      return this.mockService.create(building);
    }
    return this.http.post<Building>(this.apiUrl, building);
  }

  update(id: string, building: Partial<Building>): Observable<Building> {
    if (this.useMock) {
      return this.mockService.update(id, building);
    }
    return this.http.put<Building>(`${this.apiUrl}/${id}`, building);
  }

  delete(id: string): Observable<void> {
    if (this.useMock) {
      return this.mockService.delete(id);
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ==========================================
  // ENDPOINTS ESPECÍFICOS
  // ==========================================

  search(query: string): Observable<Building[]> {
    if (this.useMock) {
      return this.mockService.search(query);
    }
    const params = new HttpParams().set('q', query);
    return this.http.get<Building[]>(`${this.apiUrl}/search`, { params });
  }

  getActive(): Observable<Building[]> {
    if (this.useMock) {
      return this.mockService.getActive();
    }
    const params = new HttpParams().set('isActive', 'true');
    return this.http.get<Building[]>(this.apiUrl, { params });
  }

  getByFilters(filters: { [key: string]: string }): Observable<Building[]> {
    if (this.useMock) {
      return this.mockService.getByFilters(filters);
    }
    let params = new HttpParams();
    Object.keys(filters).forEach((key) => {
      params = params.set(key, filters[key]);
    });
    return this.http.get<Building[]>(this.apiUrl, { params });
  }
}
