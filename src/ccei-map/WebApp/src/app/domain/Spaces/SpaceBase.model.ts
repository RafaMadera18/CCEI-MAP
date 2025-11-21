import { Classroom, Laboratory, Office } from '.';
import { Dimensions, Coordinates } from './spaceAux';

export type Space = Classroom | Office | Laboratory;

export interface SpaceBase {
  spaceId: string;
  name: string;
  floor: number;
  coordinates: Coordinates;
  dimensions: Dimensions;
  isActive: boolean;
  imgUrl?: string;
}
