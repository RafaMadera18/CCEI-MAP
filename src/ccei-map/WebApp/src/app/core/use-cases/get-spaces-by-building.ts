import { Space } from "@domain/entities";
import { BuildingRepository } from "@repositories/building-repository";

export interface GetSpacesByBuildingUseCase {
  execute(buildingId: string): Space[];
}

export class GetSpacesByBuildingUseCaseImpl implements GetSpacesByBuildingUseCase {
  constructor(private readonly buildingRepository: BuildingRepository) {}

  execute(buildingId: string): Space[] {
    const building = this.buildingRepository.getById(buildingId);
    return building ? building.getSpaces() : [];
  }
}
