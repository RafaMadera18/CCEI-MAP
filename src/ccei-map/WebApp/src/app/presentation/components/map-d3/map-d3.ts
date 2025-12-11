import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  inject,
  ChangeDetectorRef,
} from '@angular/core';

import { MainController } from '@controllers/main-controller';
import { Space } from '@domain/entities';
import { createStreetsMock } from '@data/streets-mock';
import { Subscription } from 'rxjs';
import { MapRenderer } from './map-render';
import { PopUpMap } from './components/pop-up-map/pop-up-map';
import { CalculateShortestPathUseCaseImpl } from '../../../core/use-cases/calculate-shortest-path';
import { Graph } from '../../../data/model/Grafo';

@Component({
  selector: 'app-map-d3',
  templateUrl: './map-d3.html',
  styleUrl: './map-d3.scss',
  imports: [PopUpMap],
})
export class BuildingMapComponent implements OnInit, OnDestroy {

  private readonly controller = inject(MainController);
  private readonly calculateShortestPath = inject(CalculateShortestPathUseCaseImpl);
  

  private navigationGraph: Graph = new Graph(); 

  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
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
    const streets = createStreetsMock(); // Si esto trae calles visuales, úsalas, si no, las creamos abajo
    this.mapRenderer.render(spaces, streets);

    console.log("🏗️ Construyendo RED DE CALLES REAL...");

    // 1. Agregar todos los salones al grafo
    spaces.forEach(space => {
      this.navigationGraph.addNode({ ...space, id: space.spaceId, type: 'building' } as any); 
    });

    // ---------------------------------------------------------
    // PASO 1: CREAR LAS INTERSECCIONES (NODOS DE TRÁNSITO)
    // Estos son los puntos invisibles en los pasillos
    // ---------------------------------------------------------
    const intersections = [
      { id: 'PASILLO_MN', type: 'street_node' }, // Pasillo entre bloques M y N
      { id: 'PASILLO_CD', type: 'street_node' }, // Pasillo entre bloques C y D
      { id: 'PASILLO_H',  type: 'street_node' }, // Pasillo del bloque H
      { id: 'CRUCE_CENTRAL', type: 'street_node' } // El punto donde todo se une
    ];

    intersections.forEach(node => this.navigationGraph.addNode(node as any));


    // ---------------------------------------------------------
    // PASO 2: CONECTAR LAS INTERSECCIONES ENTRE SÍ (EL ESQUELETO)
    // Aquí definimos cómo se camina de un pasillo a otro
    // ---------------------------------------------------------
    const mainConnections = [
      // Del pasillo MN al Cruce Central
      { id: 'c1', from: 'PASILLO_MN', to: 'CRUCE_CENTRAL', dist: 50 },
      // Del pasillo CD al Cruce Central
      { id: 'c2', from: 'PASILLO_CD', to: 'CRUCE_CENTRAL', dist: 30 },
      // Del pasillo H al Cruce Central
      { id: 'c3', from: 'PASILLO_H',  to: 'CRUCE_CENTRAL', dist: 80 },
    ];

    mainConnections.forEach(conn => {
      this.addBidirectionalConnection(conn.from, conn.to, conn.dist);
    });


    // ---------------------------------------------------------
    // PASO 3: CONECTAR CADA SALÓN A SU PASILLO MÁS CERCANO
    // Usamos la letra del ID para saber dónde ponerlo
    // ---------------------------------------------------------
    spaces.forEach(space => {
      if ((space as any).type === 'street_node') return;

      const id = space.spaceId; // Ej: "M1", "C4", "H2"
      let nearestStreetId = '';

      // LÓGICA DE CERCANÍA (Heurística simple)
      if (id.startsWith('M') || id.startsWith('N')) {
        nearestStreetId = 'PASILLO_MN';
      } else if (id.startsWith('C') || id.startsWith('D')) {
        nearestStreetId = 'PASILLO_CD';
      } else if (id.startsWith('H')) {
        nearestStreetId = 'PASILLO_H';
      } else {
        // Los L u otros, los mandamos al centro por defecto
        nearestStreetId = 'CRUCE_CENTRAL';
      }

      // Conectar el salón a su calle correspondiente
      this.addBidirectionalConnection(id, nearestStreetId, 15);
    });

    console.log("✅ Grafo Topológico Construido.");
  }

  // --- FUNCIÓN HELPER PARA NO REPETIR CÓDIGO ---
  // Esta función crea el camino de IDA y de VUELTA automáticamente
  private addBidirectionalConnection(nodeA: string, nodeB: string, weight: number) {
    // A -> B
    this.navigationGraph.addConnection({
      id: `${nodeA}-${nodeB}`,
      sourceNodeId: nodeA,
      targetNodeId: nodeB,
      distance: weight,
      getOtherEnd: (curr: string) => curr === nodeA ? nodeB : nodeA
    } as any);

    // B -> A
    this.navigationGraph.addConnection({
      id: `${nodeB}-${nodeA}`,
      sourceNodeId: nodeB,
      targetNodeId: nodeA,
      distance: weight,
      getOtherEnd: (curr: string) => curr === nodeB ? nodeA : nodeB
    } as any);
  }
  
  public onCalculateRoute() {
    const origen = this.selectedSpaces[0];
    const destino = this.selectedSpaces[1];

    // --- 🕵️‍♂️ ZONA DE DETECTIVES ---
    console.log("🔍 DATOS REALES:");
    console.log("👉 ID que estoy buscando (Origen):", origen.spaceId); // Ojo: spaceId o id
    console.log("👉 ID que estoy buscando (Destino):", destino.spaceId);
    
    // Vamos a ver qué tiene el cerebro por dentro
    console.log("🧠 ¿Qué nodos tiene el Grafo?");
    // Imprimimos las llaves (IDs) que tiene guardadas el mapa
    console.log(Array.from(this.navigationGraph['nodes'].keys())); 
    // (Nota: si 'nodes' es privado y da error rojo, ponle: (this.navigationGraph as any).nodes.keys())
    // -----------------------------t
    
    if (this.selectedSpaces.length < 2) {
      console.warn("⚠️ Debes seleccionar 2 puntos primero.");
      return;
    }
    console.log(`🚀 Buscando ruta de ${origen.spaceId} a ${destino.spaceId}...`);

    // --- AGREGA ESTO ---
    const conexionesSalida = this.navigationGraph.getNodeConnections(origen.spaceId);
    console.log(`🛣️ Calles que salen de ${origen.spaceId}:`, conexionesSalida);
    // -----

    console.log(`🚀 Calculando ruta de ${origen.name} (${origen.spaceId}) a ${destino.name} (${destino.spaceId})...`);

    try {
      const ruta = this.calculateShortestPath.execute(
        origen.spaceId, 
        destino.spaceId, 
        this.navigationGraph
      );
      
      if (ruta.length > 0) {
        console.log("✅ ¡RUTA ENCONTRADA!", ruta);
      } else {
        console.error("❌ No se encontró camino. Verifica que las calles conecten estos edificios.");
      }

    } catch (error) {
      console.error("❌ Error crítico en el algoritmo:", error);
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
