import { Space } from "@domain/entities";
import { inject, Injectable } from "@angular/core";
import {
  GET_ALL_SPACES_USE_CASE,
  CALCULATE_SHORTEST_PATH_USE_CASE,
} from "@di/dependencies-provider";
import { Connection } from "@data/model/Connection";
import { Graph } from "@data/model/Grafo";

@Injectable({ providedIn: "root" })
export class MainController {
  private readonly getAllSpacesUseCase = inject(GET_ALL_SPACES_USE_CASE);
  private readonly calculateShortestPathUseCase = inject(
    CALCULATE_SHORTEST_PATH_USE_CASE,
  );

  getAllSpaces(): Space[] {
    return this.getAllSpacesUseCase.execute();
  }

  getShortestPath(
    startNodeId: string,
    endNodeId: string,
    graph: Graph,
  ): Connection[] {
    return this.calculateShortestPathUseCase.execute(
      startNodeId,
      endNodeId,
      graph,
    );
  }
}
