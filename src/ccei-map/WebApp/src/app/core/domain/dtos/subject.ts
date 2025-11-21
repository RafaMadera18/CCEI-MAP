import { CareerType } from "@domain/enums";

export interface Subject {
  id: string;
  name: string;
  credits: number;
  description?: string;
  career: CareerType;
}
