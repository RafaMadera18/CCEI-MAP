import { SpaceBounds } from "@domain/dtos";
import { Space } from "@domain/entities";

export interface CalculateSpaceBoundsUseCase {
  execute(spaces: Space[]): SpaceBounds;
}

export class CalculateSpaceBoundsUseCaseImpl implements CalculateSpaceBoundsUseCase {
  execute(spaces: Space[]): SpaceBounds {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const space of spaces) {
      const x = space.coordinates.latitude;
      const y = space.coordinates.longitude;
      const width = space.dimensions.width;
      const height = space.dimensions.height;

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + width);
      maxY = Math.max(maxY, y + height);
    }

    return {
      minX,
      minY,
      maxX,
      maxY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }
}
