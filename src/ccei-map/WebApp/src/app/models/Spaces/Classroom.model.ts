import { SpaceBase } from '.';
import { SpaceType } from '../enums';

export interface Classroom extends SpaceBase {
  type: SpaceType.CLASSROOM;
  nameClassroom: string;
}
