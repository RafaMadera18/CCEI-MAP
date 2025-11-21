import { SpaceBase } from '.';
import { Class } from '../academic';
import { SpaceType } from '../enums';

export interface Classroom extends SpaceBase {
  type: SpaceType.CLASSROOM;
  nameClassroom: string;
  //Classes: Class[];
}
