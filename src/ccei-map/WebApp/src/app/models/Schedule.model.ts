import { ScheduleBlock } from "./ScheduleBlock.model";

export interface Schedule {
  id: string;
  blocks: ScheduleBlock[];
  SemesterStart: Date; //period start date
  SemesterEnd: Date; // period end date
  active: boolean;
}


