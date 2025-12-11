import { Graph } from '../../data/model/Grafo'; // Ajusta la ruta si es necesario
import { Connection } from '../../data/model/Connection';

export class CalculateShortestPathUseCase {

  /**
   * Calcula la ruta más corta entre dos nodos y devuelve las conexiones (calles)
   * que se deben recorrer.
   */
  execute(startNodeId: string, endNodeId: string, graph: Graph): Connection[] {
    
    // 1. Validaciones iniciales
    const startNode = graph.getNode(startNodeId);
    const endNode = graph.getNode(endNodeId);

    if (!startNode || !endNode) {
      console.warn('Uno de los nodos no existe en el grafo');
      return [];
    }

    // 2. Estructuras para Dijkstra
    // Almacena la distancia más corta tentatival desde el inicio hasta el nodo key
    const distances = new Map<string, number>();
    
    // Almacena cómo llegamos al nodo (para reconstruir el camino al final)
    // Guardamos de qué nodo vinimos y qué conexión usamos.
    const previous = new Map<string, { nodeId: string, connection: Connection }>();
    
    // Conjunto de nodos visitados
    const visited = new Set<string>();
    
    // Cola de prioridad (simulada con un array simple para este caso)
    const unvisitedNodes: string[] = [];

    // 3. Inicialización
    graph.getAllNodes().forEach(node => {
      distances.set(node.id, Infinity);
      unvisitedNodes.push(node.id);
    });

    // La distancia al nodo inicial es 0
    distances.set(startNodeId, 0);

    // 4. Ciclo principal del algoritmo
    while (unvisitedNodes.length > 0) {
      
      // a. Obtener el nodo no visitado con la menor distancia actual
      // (Ordenamos para simular la Priority Queue)
      unvisitedNodes.sort((a, b) => (distances.get(a) || Infinity) - (distances.get(b) || Infinity));
      const currentNodeId = unvisitedNodes.shift()!; // Sacamos el primero
      
      // Si la distancia es infinita, significa que no hay conexión con el resto
      if (distances.get(currentNodeId) === Infinity) break;

      // Si llegamos al destino, terminamos temprano
      if (currentNodeId === endNodeId) break;

      visited.add(currentNodeId);

      // b. Explorar vecinos
      const connections = graph.getNodeConnections(currentNodeId);

      for (const connection of connections) {
        // Obtenemos el ID del nodo al otro extremo de la conexión
        const neighborId = connection.getOtherEnd(currentNodeId);

        if (neighborId && !visited.has(neighborId)) {
          // Calculamos la nueva distancia tentativa
          const currentDistance = distances.get(currentNodeId) || 0;
          const newDistance = currentDistance + connection.distance;

          // Si encontramos un camino más corto hacia el vecino, actualizamos
          if (newDistance < (distances.get(neighborId) || Infinity)) {
            distances.set(neighborId, newDistance);
            // Guardamos el rastro: "Para llegar a neighborId, vine de currentNodeId usando esta connection"
            previous.set(neighborId, { nodeId: currentNodeId, connection: connection });
          }
        }
      }
    }

    // 5. Reconstruir la ruta (Backtracking)
    // Vamos desde el final hacia el inicio usando el mapa 'previous'
    const pathConnections: Connection[] = [];
    let currentStep = endNodeId;

    // Verificamos si realmente llegamos al destino (si tiene un padre o es el inicio)
    if (endNodeId !== startNodeId && !previous.has(endNodeId)) {
      console.warn('No se encontró un camino entre los nodos');
      return [];
    }

    while (currentStep !== startNodeId) {
      const step = previous.get(currentStep);
      if (!step) break; // Seguridad
      
      // Agregamos la conexión al inicio del array (porque estamos yendo hacia atrás)
      pathConnections.unshift(step.connection);
      
      // Retrocedemos al nodo anterior
      currentStep = step.nodeId;
    }

    return pathConnections;
  }
}