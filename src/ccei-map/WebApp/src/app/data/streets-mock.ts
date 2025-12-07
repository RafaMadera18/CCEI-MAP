import { Street } from '@domain/entities/street';

export function createStreetsMock(): Street[] {
  return [
    new Street('street-1', [
      {
        id: 's1-1',
        startPosition: { x: 155, y: 500 },
        endPosition: { x: 555, y: 500 },
        width: 40,
      },
      {
        id: 's1-2',
        startPosition: { x: 555, y: 500 },
        endPosition: { x: 740, y: 500 },
        width: 40,
      },
      {
        id: 's1-3',
        startPosition: { x: 740, y: 500 },
        endPosition: { x: 1100, y: 500 },
        width: 40,
      },
    ]),

    new Street('street-2', [
      {
        id: 's2-1',
        startPosition: { x: 280, y: 115 },
        endPosition: { x: 280, y: 480 },
        width: 40,
      },
    ]),

    new Street('street-3', [
      {
        id: 's3-1',
        startPosition: { x: 720, y: 115 },
        endPosition: { x: 720, y: 480 },
        width: 40,
      },
      {
        id: 's3-2',
        startPosition: { x: 740, y: 295 },
        endPosition: { x: 1100, y: 295 },
        width: 40,
      },
    ]),

    new Street('street-4', [
      {
        id: 's4-1',
        startPosition: { x: 555, y: 520 },
        endPosition: { x: 555, y: 1180 },
        width: 40,
      },
    ]),
  ];
}
