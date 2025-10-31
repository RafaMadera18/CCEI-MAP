import { SpaceType } from 'app/models/enums';
import { Building, Space } from 'app/models/Spaces';

export function extractAllSpaces(buildings: Building[]): Space[] {
  const allSpaces: Space[] = [];

  buildings.forEach((building) => {
    if (building.buildingSpaces && building.buildingSpaces.length > 0) {
      building.buildingSpaces.forEach((space) => {
        (space as any).buildingId = building.id;
        (space as any).buildingName = building.name;
        allSpaces.push(space);
      });
    }
  });
  return allSpaces;
}

export function getSpaceColor(space: Space): string {
  switch (space.type) {
    case SpaceType.CLASSROOM:
      return 'url(#gradient-classroom)';
    case SpaceType.OFFICE:
      return 'url(#gradient-office)';
    case SpaceType.LABORATORY:
      return 'url(#gradient-laboratory)';
    default:
      return 'url(#gradient-default)';
  }
}

export function calculateBounds(allSpaces: Space[]) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  allSpaces.forEach((space) => {
    const x = space.coordinates.latitude;
    const y = space.coordinates.longitude;
    const width = space.dimensions.width;
    const height = space.dimensions.height;

    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x + width);
    maxY = Math.max(maxY, y + height);
  });

  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
  };
}
