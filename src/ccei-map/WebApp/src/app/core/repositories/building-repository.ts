import { Building } from "@domain/entities";

export interface BuildingRepository {
  getAll(): Building[];
  getById(id: string): Building | null;
  save(building: Building): void;
  delete(id: string): void;
}
