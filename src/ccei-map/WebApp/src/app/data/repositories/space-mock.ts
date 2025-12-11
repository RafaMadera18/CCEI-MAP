import { SpaceRepository } from '@repositories/space-repository';
import { Space } from '@domain/entities';
import { GrafoMock } from '@data/data-mock';
import { extractAllSpaces } from '@components/map-d3/mapUtils';

export class SpaceMockRepository implements SpaceRepository {
  getAllSpaces(): Space[] {
    return extractAllSpaces(GrafoMock().getAllBuildings());
  }
  getById(spaceId: string): Space {
    const space = this.getAllSpaces().find((space) => space.spaceId == spaceId);
    if (!space) {
      throw new Error('Not found space by id');
    }
    return space;
  }
}
