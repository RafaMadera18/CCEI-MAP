import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  inject,
  ChangeDetectorRef,
} from "@angular/core";

import { MainController } from "@controllers/main-controller";
import { Space } from "@domain/entities";
import { createStreetsMock } from "@data/streets-mock";
import { Subscription } from "rxjs";
import { MapRenderer } from "./map-render";
import { PopUpMap } from "./components/pop-up-map/pop-up-map";
import { Graph } from "@data/model/Grafo";

@Component({
  selector: "app-map-d3",
  templateUrl: "./map-d3.html",
  styleUrl: "./map-d3.scss",
  imports: [PopUpMap],
})
export class BuildingMapComponent implements OnInit, OnDestroy {
  private readonly controller = inject(MainController);

  private readonly navigationGraph: Graph = new Graph();

  @ViewChild("mapContainer", { static: true }) mapContainer!: ElementRef;
  selectedSpaces: Space[] = [];
  private mapRenderer!: MapRenderer;
  private selectionSub!: Subscription;
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.mapRenderer = new MapRenderer(this.mapContainer.nativeElement);
    this.selectionSub = this.mapRenderer.onSelectionChange$.subscribe(
      (selected: Space[]) => {
        this.selectedSpaces = [...selected];
        this.cdr.detectChanges();
      },
    );

    const spaces = this.controller.getAllSpaces();
    const streets = createStreetsMock();
    this.mapRenderer.render(spaces, streets);

    spaces.forEach((space) => {
      this.navigationGraph.addNode({
        ...space,
        id: space.spaceId,
        type: "building",
      } as any);
    });

    const intersections = [
      { id: "PASILLO_MN", type: "street_node" },
      { id: "PASILLO_CD", type: "street_node" },
      { id: "PASILLO_H", type: "street_node" },
      { id: "CRUCE_CENTRAL", type: "street_node" },
    ];

    intersections.forEach((node) => this.navigationGraph.addNode(node as any));

    const mainConnections = [
      { id: "c1", from: "PASILLO_MN", to: "CRUCE_CENTRAL", dist: 50 },
      { id: "c2", from: "PASILLO_CD", to: "CRUCE_CENTRAL", dist: 30 },
      { id: "c3", from: "PASILLO_H", to: "CRUCE_CENTRAL", dist: 80 },
    ];

    mainConnections.forEach((conn) => {
      this.addBidirectionalConnection(conn.from, conn.to, conn.dist);
    });

    spaces.forEach((space) => {
      if ((space as any).type === "street_node") return;

      const id = space.spaceId;
      let nearestStreetId = "";

      if (id.startsWith("M") || id.startsWith("N")) {
        nearestStreetId = "PASILLO_MN";
      } else if (id.startsWith("C") || id.startsWith("D")) {
        nearestStreetId = "PASILLO_CD";
      } else if (id.startsWith("H")) {
        nearestStreetId = "PASILLO_H";
      } else {
        nearestStreetId = "CRUCE_CENTRAL";
      }

      this.addBidirectionalConnection(id, nearestStreetId, 15);
    });
  }

  private addBidirectionalConnection(
    nodeA: string,
    nodeB: string,
    weight: number,
  ) {
    this.navigationGraph.addConnection({
      id: `${nodeA}-${nodeB}`,
      sourceNodeId: nodeA,
      targetNodeId: nodeB,
      distance: weight,
      getOtherEnd: (curr: string) => (curr === nodeA ? nodeB : nodeA),
    } as any);

    this.navigationGraph.addConnection({
      id: `${nodeB}-${nodeA}`,
      sourceNodeId: nodeB,
      targetNodeId: nodeA,
      distance: weight,
      getOtherEnd: (curr: string) => (curr === nodeB ? nodeA : nodeB),
    } as any);
  }

  public onCalculateRoute() {
    const origen = this.selectedSpaces[0];
    const destino = this.selectedSpaces[1];

    if (this.selectedSpaces.length < 2) {
      console.warn("Debes seleccionar 2 puntos primero.");
      return;
    }

    console.log(`Buscando ruta de ${origen.spaceId} a ${destino.spaceId}...`);

    const conexionesSalida = this.navigationGraph.getNodeConnections(
      origen.spaceId,
    );

    console.log(`Calles que salen de ${origen.spaceId}:`, conexionesSalida);

    console.log(
      `Calculando ruta de ${origen.name} (${origen.spaceId}) a ${destino.name} (${destino.spaceId})...`,
    );

    const ruta = this.controller.getShortestPath(
      origen.spaceId,
      destino.spaceId,
      this.navigationGraph,
    );

    if (ruta.length > 0) {
      console.log("¡RUTA ENCONTRADA!", ruta);
    } else {
      console.error(
        "No se encontró camino. Verifica que las calles conecten estos edificios.",
      );
    }
  }
  ngOnDestroy() {
    if (this.selectionSub) {
      this.selectionSub.unsubscribe();
    }
  }

  centerView() {
    const spaces = this.controller.getAllSpaces();
    this.mapRenderer.centerView(spaces);
  }

  zoomIn() {
    this.mapRenderer.zoomIn();
  }

  zoomOut() {
    this.mapRenderer.zoomOut();
  }
}
