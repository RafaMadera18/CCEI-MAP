import { SpaceBase } from "..";
import { SpaceType } from "../enums";

export interface Office extends SpaceBase {
  type: SpaceType.OFFICE;
  number: string; // Ex: "D-105"
  professorId: string;
}