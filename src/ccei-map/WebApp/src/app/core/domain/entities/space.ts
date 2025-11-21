import { Coordinates } from "@domain/dtos";
import { Dimensions } from "@domain/dtos/dimensions";
import { SpaceType } from "@domain/enums";

export abstract class Space {
  constructor(
    public readonly spaceId: string,
    public readonly name: string,
    public readonly floor: number,
    public readonly coordinates: Coordinates,
    public readonly dimensions: Dimensions,
    public readonly isActive: boolean,
    public readonly imgUrl?: string
  ) {}

  abstract getSpaceType(): SpaceType;

  isAvailable(): boolean {
    return this.isActive;
  }

  getDisplayName(): string {
    return `${this.name} - Piso ${this.floor}`;
  }

  calculateArea(): number {
    return this.dimensions.width * this.dimensions.height;
  }
}
