import { Space } from "@domain/entities";
import { BuildingRepository } from "@repositories/building-repository";

export interface GetAllSpacesUseCase {
  execute(): Space[];
}

export class GetAllSpacesUseCaseImpl implements GetAllSpacesUseCase {
  constructor(private readonly buildingRepository: BuildingRepository) {}

  execute(): Space[] {
    const buildings = this.buildingRepository.getAll();
    return buildings.flatMap(building => building.getSpaces());
  }
}
