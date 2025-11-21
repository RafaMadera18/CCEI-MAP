import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { dataMock } from '../../../../data/data-mock';
import { Building } from 'app/domain/Spaces';

@Injectable({
  providedIn: 'root',
})
export class BuildingMockService {
  private buildings: Building[] = JSON.parse(JSON.stringify(dataMock));
  private readonly networkDelay = 500;

  constructor() {
    console.log(
      '🎭 BuildingMockService: Inicializado con',
      this.buildings.length,
      'edificios',
    );
  }

  /**
   * Obtiene todos los edificios
   * GET /api/buildings
   */
  getAll(): Observable<Building[]> {
    console.log('🎭 MockService: getAll()');
    return of([...this.buildings]).pipe(delay(this.networkDelay));
  }

  /**
   * Obtiene un edificio por ID
   * GET /api/buildings/:id
   */
  getById(id: string): Observable<Building> {
    console.log('🎭 MockService: getById(', id, ')');

    const building = this.buildings.find((b) => b.id === id);

    if (!building) {
      return throwError(
        () => new Error(`Edificio con ID ${id} no encontrado`),
      ).pipe(delay(this.networkDelay));
    }

    return of({ ...building }).pipe(delay(this.networkDelay));
  }

  /**
   * Obtiene edificio con sus espacios (ya vienen incluidos en dataMock)
   * GET /api/buildings/:id/with-spaces
   */
  getWithSpaces(id: string): Observable<Building> {
    console.log('🎭 MockService: getWithSpaces(', id, ')');
    return this.getById(id); // En el mock ya incluye buildingSpaces
  }

  /**
   * Crea un nuevo edificio
   * POST /api/buildings
   */
  create(building: Partial<Building>): Observable<Building> {
    console.log('🎭 MockService: create()', building);

    // Generar ID único
    const newId = `B${this.buildings.length + 1}`;

    const newBuilding: Building = {
      id: newId,
      name: building.name || 'Nuevo Edificio',
      numFloors: building.numFloors || 1,
      isActive: building.isActive ?? true,
      buildingSpaces: building.buildingSpaces || [],
    };

    this.buildings.push(newBuilding);

    return of({ ...newBuilding }).pipe(delay(this.networkDelay));
  }

  /**
   * Actualiza un edificio
   * PUT /api/buildings/:id
   */
  update(id: string, updates: Partial<Building>): Observable<Building> {
    console.log('🎭 MockService: update(', id, ')', updates);

    const index = this.buildings.findIndex((b) => b.id === id);

    if (index === -1) {
      return throwError(
        () => new Error(`Edificio con ID ${id} no encontrado`),
      ).pipe(delay(this.networkDelay));
    }

    // Actualizar edificio
    this.buildings[index] = {
      ...this.buildings[index],
      ...updates,
      id, // Mantener el ID original
    };

    return of({ ...this.buildings[index] }).pipe(delay(this.networkDelay));
  }

  /**
   * Elimina un edificio
   * DELETE /api/buildings/:id
   */
  delete(id: string): Observable<void> {
    console.log('🎭 MockService: delete(', id, ')');

    const index = this.buildings.findIndex((b) => b.id === id);

    if (index === -1) {
      return throwError(
        () => new Error(`Edificio con ID ${id} no encontrado`),
      ).pipe(delay(this.networkDelay));
    }

    this.buildings.splice(index, 1);

    return of(void 0).pipe(delay(this.networkDelay));
  }

  // ==========================================
  // MÉTODOS ESPECÍFICOS
  // ==========================================

  /**
   * Busca edificios por nombre
   * GET /api/buildings/search?q=query
   */
  search(query: string): Observable<Building[]> {
    console.log('🎭 MockService: search(', query, ')');

    const lowerQuery = query.toLowerCase();
    const results = this.buildings.filter((b) =>
      b.name.toLowerCase().includes(lowerQuery),
    );

    return of([...results]).pipe(delay(this.networkDelay));
  }

  /**
   * Obtiene solo edificios activos
   * GET /api/buildings?isActive=true
   */
  getActive(): Observable<Building[]> {
    console.log('🎭 MockService: getActive()');

    const activeBuildings = this.buildings.filter((b) => b.isActive);

    return of([...activeBuildings]).pipe(delay(this.networkDelay));
  }

  /**
   * Obtiene edificios por filtros
   * GET /api/buildings?filter1=value1&filter2=value2
   */
  getByFilters(filters: { [key: string]: string }): Observable<Building[]> {
    console.log('🎭 MockService: getByFilters()', filters);

    let results = [...this.buildings];

    // Aplicar filtros
    if (filters['isActive'] !== undefined) {
      const isActive = filters['isActive'] === 'true';
      results = results.filter((b) => b.isActive === isActive);
    }

    if (filters['minFloors']) {
      const minFloors = parseInt(filters['minFloors']);
      results = results.filter((b) => b.numFloors >= minFloors);
    }

    if (filters['maxFloors']) {
      const maxFloors = parseInt(filters['maxFloors']);
      results = results.filter((b) => b.numFloors <= maxFloors);
    }

    return of(results).pipe(delay(this.networkDelay));
  }

  resetData(): void {
    console.log('🎭 MockService: Reseteando datos a dataMock original');
    this.buildings = JSON.parse(JSON.stringify(dataMock));
  }

  /**
   * Obtiene el estado actual de los datos
   */
  getCurrentData(): Building[] {
    return [...this.buildings];
  }
}
