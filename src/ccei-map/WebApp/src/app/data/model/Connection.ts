export class Connection {
  constructor(
    public sourceNodeId: string,
    public targetNodeId: string,
    public distance: number,
    public streetId?: string,
  ) {}

  isConnectedTo(nodeId: string): boolean {
    return this.sourceNodeId === nodeId || this.targetNodeId === nodeId;
  }

  getOtherEnd(nodeId: string): string | null {
    if (this.sourceNodeId === nodeId) return this.targetNodeId;
    if (this.targetNodeId === nodeId) return this.sourceNodeId;
    return null;
  }
}
