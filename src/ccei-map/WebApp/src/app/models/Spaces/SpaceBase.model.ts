import { Classroom, Laboratory, Office } from "..";
import { Coordinates } from "../Coordinates.model";


export type Space = Classroom | Office | Laboratory;

export interface SpaceBase {
  id: string;
  name: string;
  buildingId: string; // Reference to the building where it's located
  floor: number;
  coordinates: Coordinates;
  active: boolean;
}