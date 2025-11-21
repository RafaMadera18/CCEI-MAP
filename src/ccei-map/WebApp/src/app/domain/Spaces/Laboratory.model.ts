import { SpaceBase } from '.';
import { SpaceType } from '../enums';

export interface Laboratory extends SpaceBase {
  type: SpaceType.LABORATORY;
  laboratoryName: string;
}
