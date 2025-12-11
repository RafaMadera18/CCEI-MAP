import { Space } from '@domain/entities';
import { SpaceRepository } from '@repositories/space-repository';

export interface GetSpaceByIdUseCase {
  execute(spaceId: string): Space;
}

export class GetSpaceByIdUseCaseImpl implements GetSpaceByIdUseCase {
  constructor(private readonly spaceRepository: SpaceRepository) {}

  execute(spaceId: string): Space {
    const space = this.spaceRepository.getById(spaceId);
    return space;
  }
}
