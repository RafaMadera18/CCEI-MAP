import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, catchError, delay } from 'rxjs/operators';
import { Building } from 'app/domain/Spaces';
import { BuildingApiService } from '../service/building-api.service';

@Injectable({
  providedIn: 'root',
})
export class BuildingRepository {
  private cache = new Map<string, Building>();
  private allBuildingsCache: Building[] | null = null;
  private cacheExpiry = 5 * 60 * 1000;
  private lastCacheTime: number = 0;

  constructor(private api: BuildingApiService) {}

  getAll(): Observable<Building[]> {
    // Verificar si el caché es válido
    if (this.isCacheValid() && this.allBuildingsCache) {
      console.log('📦 BuildingRepository: Usando caché para getAll');
      return of(this.allBuildingsCache);
    }

    console.log('🌐 BuildingRepository: Llamando al API para getAll');
    return this.api.getAll().pipe(
      tap((buildings) => {
        console.log(
          `✅ BuildingRepository: ${buildings.length} edificios cargados`,
        );
        // Guardar en caché
        this.allBuildingsCache = buildings;
        this.lastCacheTime = Date.now();

        // Actualizar caché individual
        buildings.forEach((b) => this.cache.set(b.id, b));
      }),
      catchError((error) => {
        console.error('❌ BuildingRepository: Error en getAll', error);
        // Retornar array vacío en caso de error
        return of([]);
      }),
    );
  }

  /**
   * Obtiene un edificio por ID
   * Usa caché si está disponible
   */
  getById(id: string): Observable<Building> {
    // Verificar caché individual
    if (this.cache.has(id)) {
      console.log(`📦 BuildingRepository: Usando caché para edificio ${id}`);
      return of(this.cache.get(id)!);
    }

    console.log(`🌐 BuildingRepository: Llamando al API para edificio ${id}`);
    return this.api.getById(id).pipe(
      tap((building) => {
        console.log(
          `✅ BuildingRepository: Edificio cargado - ${building.name}`,
        );
        // Guardar en caché
        this.cache.set(id, building);
      }),
      catchError((error) => {
        console.error(
          `❌ BuildingRepository: Error al cargar edificio ${id}`,
          error,
        );
        return throwError(
          () => new Error(`No se pudo cargar el edificio ${id}`),
        );
      }),
    );
  }

  getWithSpaces(id: string): Observable<Building> {
    console.log(
      `🌐 BuildingRepository: Obteniendo edificio ${id} con espacios`,
    );
    return this.api.getWithSpaces(id).pipe(
      tap((building) => {
        console.log(
          `✅ BuildingRepository: Edificio con ${building.buildingSpaces?.length || 0} espacios`,
        );
        // Actualizar caché
        this.cache.set(id, building);
      }),
      catchError((error) => {
        console.error(
          `❌ BuildingRepository: Error al cargar edificio con espacios`,
          error,
        );
        return throwError(() => error);
      }),
    );
  }

  /**
   * Crea un nuevo edificio
   */
  create(building: Partial<Building>): Observable<Building> {
    console.log('🌐 BuildingRepository: Creando edificio', building);
    return this.api.create(building).pipe(
      tap((newBuilding) => {
        console.log(
          `✅ BuildingRepository: Edificio creado - ${newBuilding.name}`,
        );
        // Agregar a caché
        this.cache.set(newBuilding.id, newBuilding);
        // Invalidar caché de lista
        this.invalidateListCache();
      }),
      catchError((error) => {
        console.error('❌ BuildingRepository: Error al crear edificio', error);
        return throwError(() => new Error('No se pudo crear el edificio'));
      }),
    );
  }

  /**
   * Actualiza un edificio
   */
  update(id: string, building: Partial<Building>): Observable<Building> {
    console.log(`🌐 BuildingRepository: Actualizando edificio ${id}`, building);
    return this.api.update(id, building).pipe(
      tap((updatedBuilding) => {
        console.log(
          `✅ BuildingRepository: Edificio actualizado - ${updatedBuilding.name}`,
        );
        // Actualizar caché
        this.cache.set(id, updatedBuilding);
        // Invalidar caché de lista
        this.invalidateListCache();
      }),
      catchError((error) => {
        console.error(
          `❌ BuildingRepository: Error al actualizar edificio ${id}`,
          error,
        );
        return throwError(() => new Error('No se pudo actualizar el edificio'));
      }),
    );
  }

  /**
   * Elimina un edificio
   */
  delete(id: string): Observable<void> {
    console.log(`🌐 BuildingRepository: Eliminando edificio ${id}`);
    return this.api.delete(id).pipe(
      tap(() => {
        console.log(`✅ BuildingRepository: Edificio ${id} eliminado`);
        // Remover de caché
        this.cache.delete(id);
        // Invalidar caché de lista
        this.invalidateListCache();
      }),
      catchError((error) => {
        console.error(
          `❌ BuildingRepository: Error al eliminar edificio ${id}`,
          error,
        );
        return throwError(() => new Error('No se pudo eliminar el edificio'));
      }),
    );
  }

  search(query: string): Observable<Building[]> {
    console.log(`🔍 BuildingRepository: Buscando "${query}"`);

    if (!query || query.trim() === '') {
      return this.getAll();
    }

    return this.api.search(query).pipe(
      map((buildings) => {
        // Ordenar resultados por nombre
        return buildings.sort((a, b) => a.name.localeCompare(b.name));
      }),
      tap((results) => {
        console.log(
          `✅ BuildingRepository: ${results.length} resultados encontrados`,
        );
      }),
      catchError((error) => {
        console.error('❌ BuildingRepository: Error en búsqueda', error);
        return of([]);
      }),
    );
  }

  getActive(): Observable<Building[]> {
    console.log('🌐 BuildingRepository: Obteniendo edificios activos');
    return this.api.getActive().pipe(
      tap((buildings) => {
        console.log(
          `✅ BuildingRepository: ${buildings.length} edificios activos`,
        );
      }),
      catchError((error) => {
        console.error(
          '❌ BuildingRepository: Error al obtener edificios activos',
          error,
        );
        return of([]);
      }),
    );
  }

  filterLocal(
    predicate: (building: Building) => boolean,
  ): Observable<Building[]> {
    return this.getAll().pipe(map((buildings) => buildings.filter(predicate)));
  }

  getByFloorCount(
    minFloors: number,
    maxFloors?: number,
  ): Observable<Building[]> {
    return this.getAll().pipe(
      map((buildings) => {
        return buildings.filter((b) => {
          const meetsMin = b.numFloors >= minFloors;
          const meetsMax = maxFloors ? b.numFloors <= maxFloors : true;
          return meetsMin && meetsMax;
        });
      }),
    );
  }

  clearCache(): void {
    this.cache.clear();
    this.allBuildingsCache = null;
    this.lastCacheTime = 0;
    console.log('🧹 BuildingRepository: Caché limpiado');
  }

  private invalidateListCache(): void {
    this.allBuildingsCache = null;
    this.lastCacheTime = 0;
    console.log('🧹 BuildingRepository: Caché de lista invalidado');
  }

  private isCacheValid(): boolean {
    const now = Date.now();
    return now - this.lastCacheTime < this.cacheExpiry;
  }

  preloadToCache(building: Building): void {
    this.cache.set(building.id, building);
    console.log(
      `📦 BuildingRepository: Edificio ${building.id} precargado en caché`,
    );
  }

  getCacheSize(): { individual: number; list: boolean } {
    return {
      individual: this.cache.size,
      list: this.allBuildingsCache !== null,
    };
  }
}
