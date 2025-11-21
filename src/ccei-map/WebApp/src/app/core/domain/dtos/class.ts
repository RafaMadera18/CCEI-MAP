
import { Classroom, Professor } from "@domain/entities";
import { Subject } from "./subject";
import { DayOfWeek } from "@domain/enums";

export interface Class {
  id: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  classRoom: Classroom;
  subject: Subject;
  professor: Professor;
}
