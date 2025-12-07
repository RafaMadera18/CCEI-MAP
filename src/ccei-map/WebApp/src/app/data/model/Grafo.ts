import { Building } from '@domain/entities';
import { BuildingNode } from './BuildingNode';
import { Connection } from './Connection';
import { Node } from './Node';
import { Street } from '@domain/entities/street';

export class Graph {
  private nodes: Map<string, Node> = new Map();
  private connections: Connection[] = [];
  private adjacencies: Map<string, Connection[]> = new Map();
  private streets: Map<string, Street> = new Map();

  addNode(node: Node): void {
    this.nodes.set(node.id, node);
    if (!this.adjacencies.has(node.id)) {
      this.adjacencies.set(node.id, []);
    }
  }

  addConnection(connection: Connection): void {
    this.connections.push(connection);
    this.adjacencies.get(connection.sourceNodeId)?.push(connection);
    this.adjacencies.get(connection.targetNodeId)?.push(connection);
  }

  getNode(id: string): Node | undefined {
    return this.nodes.get(id);
  }

  getNodeConnections(nodeId: string): Connection[] {
    return this.adjacencies.get(nodeId) || [];
  }

  getAllNodes(): Node[] {
    return Array.from(this.nodes.values());
  }

  getAllConnections(): Connection[] {
    return this.connections;
  }

  getAllBuildings(): Building[] {
    return Array.from(this.nodes.values())
      .filter((node): node is BuildingNode => node.type === 'building')
      .map((node) => node.building);
  }

  addStreet(street: Street): void {
    this.streets.set(street.id, street);
  }

  getStreet(streetId: string): Street | undefined {
    return this.streets.get(streetId);
  }

  getAllStreets(): Street[] {
    return Array.from(this.streets.values());
  }
}
