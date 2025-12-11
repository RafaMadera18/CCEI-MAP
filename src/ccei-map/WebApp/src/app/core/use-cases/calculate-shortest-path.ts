import { Graph } from "@data/model/Grafo";
import { Connection } from "@data/model/Connection";

export interface CalculateShortestPathUseCase {
  execute(startNodeId: string, endNodeId: string, graph: Graph): Connection[];
}

export class CalculateShortestPathUseCaseImpl
  implements CalculateShortestPathUseCase
{
  execute(startNodeId: string, endNodeId: string, graph: Graph): Connection[] {
    if (!this.nodesExist(startNodeId, endNodeId, graph)) {
      console.warn("Uno de los nodos no existe en el grafo");
      return [];
    }

    const distances = this.initializeDistances(graph, startNodeId);

    const previous = new Map<
      string,
      { nodeId: string; connection: Connection }
    >();

    this.runDijkstra(graph, distances, previous, endNodeId);

    return this.buildPath(previous, startNodeId, endNodeId);
  }

  private nodesExist(startId: string, endId: string, graph: Graph): boolean {
    return Boolean(graph.getNode(startId) && graph.getNode(endId));
  }

  private initializeDistances(
    graph: Graph,
    startId: string,
  ): Map<string, number> {
    const distances = new Map<string, number>();
    for (const node of graph.getAllNodes()) {
      distances.set(node.id, Infinity);
    }

    distances.set(startId, 0);
    return distances;
  }

  private runDijkstra(
    graph: Graph,
    distances: Map<string, number>,
    previous: Map<string, { nodeId: string; connection: Connection }>,
    endId: string,
  ): void {
    const unvisited = graph.getAllNodes().map((n) => n.id);

    while (unvisited.length > 0) {
      this.sortByDistance(unvisited, distances);
      const currentId = unvisited.shift()!;
      const currentDistance = distances.get(currentId)!;

      if (currentDistance === Infinity || currentId === endId) return;

      this.updateNeighbors(
        graph,
        distances,
        previous,
        unvisited,
        currentId,
        currentDistance,
      );
    }
  }

  private sortByDistance(
    unvisited: string[],
    distances: Map<string, number>,
  ): void {
    unvisited.sort((a, b) => distances.get(a)! - distances.get(b)!);
  }

  private updateNeighbors(
    graph: Graph,
    distances: Map<string, number>,
    previous: Map<string, { nodeId: string; connection: Connection }>,
    unvisited: string[],
    currentId: string,
    currentDistance: number,
  ): void {
    for (const connection of graph.getNodeConnections(currentId)) {
      const neighborId = connection.getOtherEnd(currentId);
      if (!neighborId || !unvisited.includes(neighborId)) continue;

      const newDistance = currentDistance + connection.distance;
      if (newDistance < distances.get(neighborId)!) {
        distances.set(neighborId, newDistance);
        previous.set(neighborId, { nodeId: currentId, connection });
      }
    }
  }

  private buildPath(
    previous: Map<string, { nodeId: string; connection: Connection }>,
    startId: string,
    endId: string,
  ): Connection[] {
    if (startId !== endId && !previous.has(endId)) {
      console.warn("No se encontró un camino entre los nodos");
      return [];
    }

    const path: Connection[] = [];
    let current = endId;

    while (current !== startId) {
      const step = previous.get(current);
      if (!step) break;
      path.unshift(step.connection);
      current = step.nodeId;
    }

    return path;
  }
}
