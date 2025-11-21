import { SpaceBase } from '.';
import { SpaceType } from '../enums';

export interface Office extends SpaceBase {
  type: SpaceType.OFFICE;
  codeOfice: string;
}
