import { Classroom } from "./Spaces/Classroom.model";
import { Laboratory } from "./Spaces/Laboratory.model";
import { Office } from "./Spaces/Office.model";

export interface Building {
  id: string;
  name: string; // Ex: "Building D"
  letter: string; // Ex: "D"
  floors: number; // Number of floors
  faculty?: string; // Ex: "FMAT", "FIQ"
  classrooms?: Classroom[];
  offices?: Office[];
  laboratories?: Laboratory[];
  description?: string;
}
