export interface Node {
  id: string;
  type: 'building' | 'intersection';
  position: { x: number; y: number };
}
