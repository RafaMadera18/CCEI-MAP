import { Building } from "@domain/entities";
import { BuildingRepository } from "@repositories/building-repository";
import { dataMock } from "@data/data-mock";

export class BuildingMockRepository implements BuildingRepository {
  private buildings: Building[];

  constructor() {
    this.buildings = dataMock;
  }

  getAll(): Building[] {
    return [...this.buildings];
  }

  getById(id: string): Building | null {
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
}
