import { Schedule, SpaceBase } from "..";
import { SpaceType } from "../enums";

export interface Classroom extends SpaceBase {
  type: SpaceType.CLASSROOM;
  number: string; // Ex: "D-201" (Building D, number 201)
  schedule: Schedule; // Classroom schedule (what classes are taught)
}