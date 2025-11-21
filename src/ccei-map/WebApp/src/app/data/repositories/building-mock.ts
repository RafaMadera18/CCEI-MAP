import { Building, Laboratory } from "@domain/entities";
import { BuildingRepository } from "@repositories/building-repository";

export class BuildingMockRepository implements BuildingRepository {
  private buildings: Building[];

  constructor() {
    this.buildings = this.loadMockData();
  }

  getAll(): Building[] {
    return [...this.buildings];
  }

  getById(id: string): Building| null {
    return this.buildings.find(b => b.id === id) || null;
  }

  save(building: Building): void {
    const index = this.buildings.findIndex(b => b.id === building.id);
    if (index === -1) {
      this.buildings.push(building);
    } else {
      this.buildings[index] = building;
    }
  }

  delete(id: string): void {
    this.buildings = this.buildings.filter(b => b.id !== id);
  }

  private loadMockData(): Building[] {
    // Datos mock convertidos a entidades
    const building1 = new Building('B1', 'Edificio L - Laboratorios', 1, [], true);
    building1.addSpace(new Laboratory(
      'L-1', 'LAB 1', 1,
      { latitude: 100, longitude: 100 },
      { width: 100, height: 150 },
      true, 'Laboratorio 1',
      'https://upload.wikimedia.org/wikipedia/commons/e/e9/Facultad_de_Matem%C3%A1ticas_UADY.jpg'
    ));
    building1.addSpace(new Laboratory(
      'L-2', 'LAB 2', 1,
      { latitude: 100, longitude: 280 },
      { width: 100, height: 150 },
      true, 'Laboratorio 2',
      'https://upload.wikimedia.org/wikipedia/commons/e/e9/Facultad_de_Matem%C3%A1ticas_UADY.jpg'
    ));

    const building2 = new Building('B2', 'Edificio C - Aulas', 2, [], true);
    // Agregar aulas del edificio C...

    return [building1, building2];
  }
}
