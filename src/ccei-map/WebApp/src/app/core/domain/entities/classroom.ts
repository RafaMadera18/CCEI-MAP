import { Coordinates, Dimensions } from "@domain/dtos";
import { Space } from "./space";
import { SpaceType } from "@domain/enums";

export class Classroom extends Space {
  constructor(
    spaceId: string,
    name: string,
    floor: number,
    coordinates: Coordinates,
    dimensions: Dimensions,
    isActive: boolean,
    public readonly nameClassroom: string,
    imgUrl?: string,
  ) {
    super(spaceId, name, floor, coordinates, dimensions, isActive, imgUrl);
  }

  getSpaceType(): SpaceType {
    return SpaceType.CLASSROOM;
  }
}
