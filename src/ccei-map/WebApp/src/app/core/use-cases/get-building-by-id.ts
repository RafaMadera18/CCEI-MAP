import { Building } from "@domain/entities";
import { BuildingRepository } from "@repositories/building-repository";

export interface GetBuildingByIdUseCase {
  execute(id: string): Building | null;
}

export class GetBuildingByIdUseCaseImpl implements GetBuildingByIdUseCase {
  constructor(private readonly buildingRepository: BuildingRepository) {}

  execute(id: string): Building | null {
    return this.buildingRepository.getById(id);
  }
}
