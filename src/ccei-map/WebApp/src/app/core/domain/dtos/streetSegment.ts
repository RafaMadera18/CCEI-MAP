export interface StreetSegment {
  id: string;
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  width: number;
  name?: string;
}
