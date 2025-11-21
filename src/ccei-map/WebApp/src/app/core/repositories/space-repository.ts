import { Space } from "@domain/entities";

export interface SpaceRepository {
  getAllSpaces(): Space[];
}
