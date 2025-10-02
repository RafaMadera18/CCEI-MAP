export interface Course {
  id: string;
  name: string;
  code: string; // Ex: "MAT-101"
  professorId: string; // Reference to the professor who teaches it
  description?: string;
}