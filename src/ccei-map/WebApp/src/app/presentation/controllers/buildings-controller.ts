import { Injectable, inject } from '@angular/core';
import { Building} from "@domain/entities";
import {
  GET_ALL_BUILDINGS_USE_CASE,
  GET_BUILDING_BY_ID_USE_CASE,
} from "@di/dependencies-provider";

@Injectable()
export class BuildingsController {
  private readonly getAllBuildingsUseCase = inject(GET_ALL_BUILDINGS_USE_CASE);
  private readonly getBuildingByIdUseCase = inject(GET_BUILDING_BY_ID_USE_CASE);


  getAllBuildings(): Building[] {
    return this.getAllBuildingsUseCase.execute();
  }

  getBuildingById(id: string): Building | null {
    return this.getBuildingByIdUseCase.execute(id);
  }


}
