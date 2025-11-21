import { Space } from './SpaceBase.model';

export interface Building {
  id: string;
  name: string;
  numFloors: number;
  buildingSpaces: Space[];
  isActive: boolean;
}
