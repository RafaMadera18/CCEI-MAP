import { Schedule, SpaceBase } from "..";
import { SpaceType } from "../enums";

export interface Laboratory extends SpaceBase {
  type: SpaceType.LABORATORY;
  number: string; // Ex: "LAB-FIQ-01"
  specialty: string; // Ex: "Chemistry", "Physics", "Computer Science"
  schedule: Schedule; // Laboratory usage schedule
}