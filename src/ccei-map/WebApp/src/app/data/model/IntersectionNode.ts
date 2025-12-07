import { Node } from './Node';

export class IntersectionNode implements Node {
  id: string;
  position: { x: number; y: number };
  readonly type = 'intersection' as const;

  constructor(id: string, position: { x: number; y: number }) {
    this.id = id;
    this.position = position;
  }
}
