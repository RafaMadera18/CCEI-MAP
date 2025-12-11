import { Injectable } from '@angular/core';
import { Graph } from '../../data/model/Grafo';
import { Connection } from '../../data/model/Connection';

export interface CalculateShortestPathUseCase {
  execute(startNodeId: string, endNodeId: string, graph: Graph): Connection[];
}
@Injectable({
  providedIn: 'root'
})
export class CalculateShortestPathUseCaseImpl implements CalculateShortestPathUseCase {

  execute(startNodeId: string, endNodeId: string, graph: Graph): Connection[] {
    
    // 1. Validaciones iniciales
    const startNode = graph.getNode(startNodeId);
    const endNode = graph.getNode(endNodeId);

    if (!startNode || !endNode) {
      console.warn('Uno de los nodos no existe en el grafo');
      return [];
    }

    // 2. Estructuras para Dijkstra
    const distances = new Map<string, number>();
    const previous = new Map<string, { nodeId: string; connection: Connection }>();
    const visited = new Set<string>();
    const unvisitedNodes: string[] = [];

    // 3. Inicialización
    graph.getAllNodes().forEach(node => {
      distances.set(node.id, Infinity);
      unvisitedNodes.push(node.id);
    });

    distances.set(startNodeId, 0);

    // 4. Algoritmo principal
    while (unvisitedNodes.length > 0) {
      
      unvisitedNodes.sort(
        (a, b) => (distances.get(a) || Infinity) - (distances.get(b) || Infinity)
      );
      
      const currentNodeId = unvisitedNodes.shift()!;
      
      /* esto rompía el calculo de la distancia*/
      /*if (distances.get(currentNodeId) === Infinity)
        break; */

      if (currentNodeId === endNodeId)
        break;

      visited.add(currentNodeId);

      const connections = graph.getNodeConnections(currentNodeId);

      for (const connection of connections) {
        const neighborId = connection.getOtherEnd(currentNodeId);

        if (neighborId && !visited.has(neighborId)) {
          
          const currentDistance = distances.get(currentNodeId) || 0;
          const newDistance = currentDistance + connection.distance;

          if (newDistance < (distances.get(neighborId) || Infinity)) {
            distances.set(neighborId, newDistance);
            previous.set(neighborId, {
              nodeId: currentNodeId,
              connection: connection
            });
          }
        }
      }
    }

    // 5. Reconstrucción de ruta
    const pathConnections: Connection[] = [];
    let currentStep = endNodeId;

    if (endNodeId !== startNodeId && !previous.has(endNodeId)) {
      console.warn('No se encontró un camino entre los nodos');
      return [];
    }

    while (currentStep !== startNodeId) {
      const step = previous.get(currentStep);
      if (!step) break;

      pathConnections.unshift(step.connection);
      currentStep = step.nodeId;
    }

    return pathConnections;
  }
}
