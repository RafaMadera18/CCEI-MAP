import { Subject } from '.';
import { DayOfWeek } from '../enums';
import { Classroom } from '../Spaces';
import { Professor } from '../entities';

export interface Class {
  id: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  classRoom: Classroom;
  subject: Subject;
  professor: Professor;
}
