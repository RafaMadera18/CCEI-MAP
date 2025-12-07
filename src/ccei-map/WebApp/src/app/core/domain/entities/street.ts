import { StreetSegment } from '@domain/dtos/streetSegment';

export class Street {
  constructor(
    public id: string,
    public segments: StreetSegment[],
    public name?: string,
  ) {}

  getAllPoints(): { x: number; y: number }[] {
    const points: { x: number; y: number }[] = [];
    this.segments.forEach((segment, index) => {
      if (index === 0) {
        points.push(segment.startPosition);
      }
      points.push(segment.endPosition);
    });
    return points;
  }
}
