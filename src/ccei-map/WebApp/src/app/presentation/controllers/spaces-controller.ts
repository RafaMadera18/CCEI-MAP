import { Injectable, inject } from '@angular/core';
import {
  GET_ALL_SPACES_USE_CASE,
  GET_SPACE_BY_ID_USE_CASE,
} from '@di/dependencies-provider';
import { Space } from '@domain/entities';

@Injectable({ providedIn: 'root' })
export class SpacesController {
  private readonly getAllSpacesUseCase = inject(GET_ALL_SPACES_USE_CASE);
  private readonly getSpaceByIdUseCase = inject(GET_SPACE_BY_ID_USE_CASE);

  getAllSpaces(): Space[] {
    return this.getAllSpacesUseCase.execute();
  }

  getSpaceById(spaceId: string): Space {
    return this.getSpaceByIdUseCase.execute(spaceId);
  }
}
