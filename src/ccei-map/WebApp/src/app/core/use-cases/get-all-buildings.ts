import { Building } from "@domain/entities";
import { BuildingRepository } from "@repositories/building-repository";

export interface GetAllBuildingsUseCase {
  execute(): Building[];
}

export class GetAllBuildingsUseCaseImpl implements GetAllBuildingsUseCase {
  constructor(private readonly buildingRepository: BuildingRepository) {}

  execute(): Building[] {
    return this.buildingRepository.getAll();
  }
}
