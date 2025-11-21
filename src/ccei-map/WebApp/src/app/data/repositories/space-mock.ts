import { SpaceRepository } from "@repositories/space-repository";
import { Space } from "@domain/entities";
import { dataMock } from "@data/data-mock";
import { extractAllSpaces } from "@components/map-d3/mapUtils";

export class SpaceMockRepository implements SpaceRepository {

  getAllSpaces(): Space[] {
    return extractAllSpaces(dataMock);
  }
}
