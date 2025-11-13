import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin, of } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { BuildingRepository } from './data/repositories/building.repository';
import { Building } from 'app/domain/Spaces';

/**
 * Facade para el feature de Buildings
 * Responsabilidad: Punto único de acceso + Lógica de negocio + Orquestación
 *
 * LOS COMPONENTES SOLO DEBEN USAR ESTE FACADE
 */
@Injectable({
  providedIn: 'root',
})
export class BuildingsFacade {
  /**
   * Edificio actualmente seleccionado
   * Los componentes pueden suscribirse para saber cuál está seleccionado
   */
  private selectedBuildingSubject = new BehaviorSubject<Building | null>(null);
  public readonly selectedBuilding$ =
    this.selectedBuildingSubject.asObservable();

  /**
   * Lista de edificios (estado global)
   */
  private buildingsSubject = new BehaviorSubject<Building[]>([]);
  public readonly buildings$ = this.buildingsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  public readonly error$ = this.errorSubject.asObservable();

  constructor(private buildingRepository: BuildingRepository) {
    console.log('🏗️ BuildingsFacade: Inicializado');
  }

  getAllBuildings(): Observable<Building[]> {
    console.log('🏗️ BuildingsFacade: getAllBuildings()');
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.buildingRepository.getAll().pipe(
      tap((buildings) => {
        console.log(
          `✅ BuildingsFacade: ${buildings.length} edificios obtenidos`,
        );
        this.buildingsSubject.next(buildings);
        this.loadingSubject.next(false);
      }),
      catchError((error) => {
        console.error('❌ BuildingsFacade: Error en getAllBuildings', error);
        this.errorSubject.next('No se pudieron cargar los edificios');
        this.loadingSubject.next(false);
        return of([]);
      }),
    );
  }

  getBuildingById(id: string): Observable<Building | null> {
    console.log(`🏗️ BuildingsFacade: getBuildingById(${id})`);
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.buildingRepository.getById(id).pipe(
      tap((building) => {
        console.log(`✅ BuildingsFacade: Edificio obtenido - ${building.name}`);
        this.selectedBuildingSubject.next(building);
        this.loadingSubject.next(false);
      }),
      catchError((error) => {
        console.error(
          `❌ BuildingsFacade: Error al obtener edificio ${id}`,
          error,
        );
        this.errorSubject.next(`No se pudo cargar el edificio`);
        this.loadingSubject.next(false);
        return of(null);
      }),
    );
  }

  getBuildingWithSpaces(id: string): Observable<Building | null> {
    console.log(`🏗️ BuildingsFacade: getBuildingWithSpaces(${id})`);
    this.loadingSubject.next(true);

    return this.buildingRepository.getWithSpaces(id).pipe(
      tap((building) => {
        console.log(
          `✅ BuildingsFacade: Edificio con ${building.buildingSpaces?.length || 0} espacios`,
        );
        this.selectedBuildingSubject.next(building);
        this.loadingSubject.next(false);
      }),
      catchError((error) => {
        console.error(
          '❌ BuildingsFacade: Error al obtener edificio con espacios',
          error,
        );
        this.errorSubject.next('No se pudo cargar el edificio completo');
        this.loadingSubject.next(false);
        return of(null);
      }),
    );
  }

  createBuilding(buildingData: Partial<Building>): Observable<Building | null> {
    console.log('🏗️ BuildingsFacade: createBuilding()', buildingData);

    if (!buildingData.name || buildingData.name.trim() === '') {
      this.errorSubject.next('El nombre del edificio es requerido');
      return of(null);
    }

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.buildingRepository.create(buildingData).pipe(
      tap((newBuilding) => {
        console.log(
          `✅ BuildingsFacade: Edificio creado - ${newBuilding.name}`,
        );

        const currentBuildings = this.buildingsSubject.value;
        this.buildingsSubject.next([...currentBuildings, newBuilding]);

        this.loadingSubject.next(false);
      }),
      catchError((error) => {
        console.error('❌ BuildingsFacade: Error al crear edificio', error);
        this.errorSubject.next('No se pudo crear el edificio');
        this.loadingSubject.next(false);
        return of(null);
      }),
    );
  }

  updateBuilding(
    id: string,
    updates: Partial<Building>,
  ): Observable<Building | null> {
    console.log(`🏗️ BuildingsFacade: updateBuilding(${id})`, updates);
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.buildingRepository.update(id, updates).pipe(
      tap((updatedBuilding) => {
        console.log(
          `✅ BuildingsFacade: Edificio actualizado - ${updatedBuilding.name}`,
        );

        const currentBuildings = this.buildingsSubject.value;
        const index = currentBuildings.findIndex((b) => b.id === id);
        if (index !== -1) {
          currentBuildings[index] = updatedBuilding;
          this.buildingsSubject.next([...currentBuildings]);
        }

        if (this.selectedBuildingSubject.value?.id === id) {
          this.selectedBuildingSubject.next(updatedBuilding);
        }

        this.loadingSubject.next(false);
      }),
      catchError((error) => {
        console.error(
          `❌ BuildingsFacade: Error al actualizar edificio ${id}`,
          error,
        );
        this.errorSubject.next('No se pudo actualizar el edificio');
        this.loadingSubject.next(false);
        return of(null);
      }),
    );
  }

  deleteBuilding(id: string): Observable<boolean> {
    console.log(`🏗️ BuildingsFacade: deleteBuilding(${id})`);
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.buildingRepository.delete(id).pipe(
      map(() => {
        console.log(`✅ BuildingsFacade: Edificio ${id} eliminado`);

        // Remover de la lista
        const currentBuildings = this.buildingsSubject.value;
        this.buildingsSubject.next(currentBuildings.filter((b) => b.id !== id));

        // Limpiar selección si corresponde
        if (this.selectedBuildingSubject.value?.id === id) {
          this.selectedBuildingSubject.next(null);
        }

        this.loadingSubject.next(false);
        return true;
      }),
      catchError((error) => {
        console.error(
          `❌ BuildingsFacade: Error al eliminar edificio ${id}`,
          error,
        );
        this.errorSubject.next('No se pudo eliminar el edificio');
        this.loadingSubject.next(false);
        return of(false);
      }),
    );
  }

  searchBuildings(query: string): Observable<Building[]> {
    console.log(`🏗️ BuildingsFacade: searchBuildings("${query}")`);

    if (!query || query.trim() === '') {
      return this.getAllBuildings();
    }

    return this.buildingRepository.search(query).pipe(
      tap((results) => {
        console.log(
          `✅ BuildingsFacade: ${results.length} resultados encontrados`,
        );
      }),
    );
  }

  getActiveBuildings(): Observable<Building[]> {
    console.log('🏗️ BuildingsFacade: getActiveBuildings()');
    return this.buildingRepository.getActive();
  }

  getBuildingsByFloors(
    minFloors: number,
    maxFloors?: number,
  ): Observable<Building[]> {
    console.log(
      `🏗️ BuildingsFacade: getBuildingsByFloors(${minFloors}, ${maxFloors})`,
    );
    return this.buildingRepository.getByFloorCount(minFloors, maxFloors);
  }

  toggleBuildingStatus(id: string): Observable<Building | null> {
    console.log(`🏗️ BuildingsFacade: toggleBuildingStatus(${id})`);

    return this.buildingRepository.getById(id).pipe(
      switchMap((building) => {
        const newStatus = !building.isActive;
        console.log(
          `🔄 Cambiando estado a: ${newStatus ? 'Activo' : 'Inactivo'}`,
        );
        return this.updateBuilding(id, { isActive: newStatus });
      }),
    );
  }

  getGeneralStats(): Observable<GeneralStats> {
    console.log('🏗️ BuildingsFacade: getGeneralStats()');

    return this.buildingRepository.getAll().pipe(
      map((buildings) => {
        const activeBuildings = buildings.filter((b) => b.isActive);
        const totalFloors = buildings.reduce((sum, b) => sum + b.numFloors, 0);

        return {
          totalBuildings: buildings.length,
          activeBuildings: activeBuildings.length,
          inactiveBuildings: buildings.length - activeBuildings.length,
          totalFloors: totalFloors,
          averageFloorsPerBuilding:
            buildings.length > 0 ? totalFloors / buildings.length : 0,
        };
      }),
    );
  }

  // ==========================================
  // MÉTODOS DE UTILIDAD (Estado)
  // ==========================================

  /**
   * Selecciona un edificio manualmente
   * USO: Al hacer clic en un edificio de la lista
   */
  selectBuilding(building: Building | null): void {
    console.log('🏗️ BuildingsFacade: selectBuilding()', building?.name);
    this.selectedBuildingSubject.next(building);
  }

  /**
   * Limpia la selección actual
   */
  clearSelection(): void {
    console.log('🏗️ BuildingsFacade: clearSelection()');
    this.selectedBuildingSubject.next(null);
  }

  /**
   * Limpia todo el estado y caché
   * USO: Al cerrar sesión, cambiar contexto
   */
  clearState(): void {
    console.log('🏗️ BuildingsFacade: clearState()');
    this.selectedBuildingSubject.next(null);
    this.buildingsSubject.next([]);
    this.errorSubject.next(null);
    this.buildingRepository.clearCache();
  }

  /**
   * Recarga los datos (fuerza actualización desde API)
   */
  refresh(): Observable<Building[]> {
    console.log('🏗️ BuildingsFacade: refresh() - Forzando recarga');
    this.buildingRepository.clearCache();
    return this.getAllBuildings();
  }
}

export interface BuildingStats {
  buildingId: string;
  buildingName: string;
  totalSpaces: number;
  activeSpaces: number;
  inactiveSpaces: number;
  occupancyRate: number;
  numFloors: number;
  isActive: boolean;
}

export interface GeneralStats {
  totalBuildings: number;
  activeBuildings: number;
  inactiveBuildings: number;
  totalFloors: number;
  averageFloorsPerBuilding: number;
}
