import { DayOfWeek } from "./enums";

export interface ScheduleBlock {
  id: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  courseId: string; // Reference to the course
  classroomId?: string; // In which classroom it's taught (if applicable)
}