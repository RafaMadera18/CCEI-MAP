import { Building } from "@domain/entities";
import { GetAllBuildingsUseCase } from "@use-cases/get-all-buildings";
import { GetBuildingByIdUseCase } from "@use-cases/get-building-by-id";

export class BuildingsController {
  constructor(
    private readonly getAllBuildingsUseCase: GetAllBuildingsUseCase,
    private readonly getBuildingByIdUseCase: GetBuildingByIdUseCase
  ) {}

  getAllBuildings(): Building[] {
    return this.getAllBuildingsUseCase.execute();
  }

  getBuildingById(id: string): Building | null {
    return this.getBuildingByIdUseCase.execute(id);
  }
}
