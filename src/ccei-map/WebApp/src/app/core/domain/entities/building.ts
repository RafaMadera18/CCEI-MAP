import { Space } from "./space";

export class Building {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly numFloors: number,
    public readonly buildingSpaces: Space[],
    public readonly isActive: boolean
  ) {}

  getSpaces(): Space[] {
    return [...this.buildingSpaces];
  }

  getActiveSpaces(): Space[] {
    return this.buildingSpaces.filter(space => space.isActive);
  }

  getSpacesByFloor(floor: number): Space[] {
    return this.buildingSpaces.filter(space => space.floor === floor);
  }

  getTotalSpaces(): number {
    return this.buildingSpaces.length;
  }

  hasSpaces(): boolean {
    return this.buildingSpaces.length > 0;
  }

  addSpace(space: Space): void {
    this.buildingSpaces.push(space);
  }
}
