import { Schedule } from ".";
import { Course } from "./Course.model";

export interface Professor {
  id: string;
  firstName: string;
  lastName: string;
  secondLastName?: string;
  email: string;
  phone?: string;
  officeId: string; // Reference to their office  // Courses they teach
  courses: Course[]; // List of courses they teach
  schedule: Schedule; // Their personal schedule (all their classes)
  isActive: boolean; // profesor is in class
}