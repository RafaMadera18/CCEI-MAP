import { Building } from '@domain/entities';
import { Node } from './Node';

export class BuildingNode implements Node {
  id: string;
  position: { x: number; y: number };
  building: Building;
  readonly type = 'building' as const;

  constructor(
    id: string,
    building: Building,
    position: { x: number; y: number },
  ) {
    this.id = id;
    this.building = building;
    this.position = position;
  }
}
