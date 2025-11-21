import { Space } from "@domain/entities";
import { GetAllSpacesUseCase } from "@use-cases/get-all-spaces";
import { GetSpacesByBuildingUseCase } from "@use-cases/get-spaces-by-building";

export class SpacesController {
  constructor(
    private readonly getSpacesByBuildingUseCase: GetSpacesByBuildingUseCase,
    private readonly getAllSpacesUseCase: GetAllSpacesUseCase
  ) {}

  getSpacesByBuilding(buildingId: string): Space[] {
    return this.getSpacesByBuildingUseCase.execute(buildingId);
  }

  getAllSpaces(): Space[] {
    return this.getAllSpacesUseCase.execute();
  }
}
