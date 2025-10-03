import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';

interface Room {
  id: string;
  name: string;
  type: 'classroom' | 'lab' | 'office' | 'bathroom' | 'stairs';
  x: number;
  y: number;
  width: number;
  height: number;
  capacity?: number;
}

interface Wall {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

@Component({
  selector: 'app-map-d3',
  template: `
    <div class="building-map">
      <div #mapContainer class="map-svg-container"></div>

      <div class="info-panel" *ngIf="selectedRoom">
        <h3>{{ selectedRoom?.name }}</h3>
        <p>
          <strong>Tipo:</strong>
          {{ selectedRoom ? getRoomTypeLabel(selectedRoom.type) : 'N/A' }}
        </p>
        <p *ngIf="selectedRoom.capacity">
          <strong>Capacidad:</strong> {{ selectedRoom?.capacity }} personas
        </p>
        <p><strong>ID:</strong> {{ selectedRoom?.id }}</p>
      </div>
      <div class="controls">
        <button (click)="resetZoom()">Restablecer Vista</button>
        <button (click)="highlightClassrooms()">Destacar Salones</button>
        <button (click)="highlightLabs()">Destacar Laboratorios</button>
      </div>
      <!-- <div class="legend">
        <h4>Leyenda</h4>
        <div class="legend-item">
          <span class="legend-color classroom"></span> Salones
        </div>
        <div class="legend-item">
          <span class="legend-color lab"></span> Laboratorios
        </div>
        <div class="legend-item">
          <span class="legend-color office"></span> Oficinas
        </div>
        <div class="legend-item">
          <span class="legend-color bathroom"></span> Baños
        </div>
        <div class="legend-item">
          <span class="legend-color stairs"></span> Escaleras
        </div>
      </div> -->
    </div>
  `,
  styles: [
    `
      .building-map {
        padding: 20px;
        font-family: Arial, sans-serif;
        max-width: 1200px;
        margin: 0 auto;
      }

      .controls {
        margin: 15px 0;
        display: flex;
        gap: 10px;
      }

      .controls button {
        padding: 10px 15px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
      }

      .controls button:hover {
        background: #2980b9;
      }

      .map-svg-container {
        border: 2px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        background: #f9f9f9;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .info-panel {
        margin-top: 20px;
        padding: 20px;
        background: #ecf0f1;
        border-radius: 8px;
        border-left: 4px solid #3498db;
      }

      .info-panel h3 {
        margin-top: 0;
        color: #2c3e50;
      }

      .info-panel p {
        margin: 8px 0;
        color: #555;
      }

      .legend {
        margin-top: 20px;
        padding: 15px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      .legend h4 {
        margin-top: 0;
        margin-bottom: 10px;
      }

      .legend-item {
        display: flex;
        align-items: center;
        margin: 8px 0;
      }

      .legend-color {
        width: 30px;
        height: 20px;
        margin-right: 10px;
        border: 1px solid #333;
        border-radius: 3px;
      }

      .legend-color.classroom {
        background: #3498db;
      }
      .legend-color.lab {
        background: #e74c3c;
      }
      .legend-color.office {
        background: #2ecc71;
      }
      .legend-color.bathroom {
        background: #95a5a6;
      }
      .legend-color.stairs {
        background: #f39c12;
      }

      /* Estilos D3 (con ::ng-deep para Angular) */
      ::ng-deep .room {
        stroke: #2c3e50;
        stroke-width: 2;
        cursor: pointer;
        transition: all 0.3s;
      }

      ::ng-deep .room:hover {
        stroke: #f39c12;
        stroke-width: 3;
        filter: brightness(1.1);
      }

      ::ng-deep .room.selected {
        stroke: #e74c3c;
        stroke-width: 4;
      }

      ::ng-deep .room.highlighted {
        filter: brightness(1.2);
        stroke-width: 3;
      }

      ::ng-deep .wall {
        stroke: #34495e;
        stroke-width: 3;
        stroke-linecap: round;
      }

      ::ng-deep .room-label {
        font-size: 12px;
        font-weight: bold;
        fill: white;
        text-anchor: middle;
        pointer-events: none;
        user-select: none;
      }

      ::ng-deep .door {
        stroke: #8e44ad;
        stroke-width: 3;
      }
    `,
  ],
})
export class BuildingMapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  selectedRoom: Room | null = null;

  private width = 900;
  private height = 600;
  private svg: any;
  private mainGroup: any;
  private zoom: any;

  // Datos del edificio
  private rooms: Room[] = [
    // Salones de clase
    {
      id: 'A101',
      name: 'Salón A-101',
      type: 'classroom',
      x: 50,
      y: 50,
      width: 120,
      height: 80,
      capacity: 40,
    },
    {
      id: 'A102',
      name: 'Salón A-102',
      type: 'classroom',
      x: 190,
      y: 50,
      width: 120,
      height: 80,
      capacity: 40,
    },
    {
      id: 'A103',
      name: 'Salón A-103',
      type: 'classroom',
      x: 330,
      y: 50,
      width: 120,
      height: 80,
      capacity: 35,
    },

    // Laboratorios
    {
      id: 'LAB1',
      name: 'Lab. de Computación',
      type: 'lab',
      x: 50,
      y: 150,
      width: 180,
      height: 100,
      capacity: 30,
    },
    {
      id: 'LAB2',
      name: 'Lab. de Física',
      type: 'lab',
      x: 250,
      y: 150,
      width: 200,
      height: 100,
      capacity: 25,
    },

    // Oficinas
    {
      id: 'OFF1',
      name: 'Coordinación',
      type: 'office',
      x: 50,
      y: 270,
      width: 100,
      height: 70,
    },
    {
      id: 'OFF2',
      name: 'Oficina 102',
      type: 'office',
      x: 170,
      y: 270,
      width: 80,
      height: 70,
    },
    {
      id: 'OFF3',
      name: 'Oficina 103',
      type: 'office',
      x: 270,
      y: 270,
      width: 80,
      height: 70,
    },

    // Servicios
    {
      id: 'BATH1',
      name: 'Baño Hombres',
      type: 'bathroom',
      x: 470,
      y: 50,
      width: 60,
      height: 80,
    },
    {
      id: 'BATH2',
      name: 'Baño Mujeres',
      type: 'bathroom',
      x: 550,
      y: 50,
      width: 60,
      height: 80,
    },
    {
      id: 'STAIRS',
      name: 'Escaleras',
      type: 'stairs',
      x: 470,
      y: 150,
      width: 80,
      height: 100,
    },

    // Más salones
    {
      id: 'A201',
      name: 'Salón A-201',
      type: 'classroom',
      x: 50,
      y: 360,
      width: 120,
      height: 80,
      capacity: 45,
    },
    {
      id: 'A202',
      name: 'Salón A-202',
      type: 'classroom',
      x: 190,
      y: 360,
      width: 120,
      height: 80,
      capacity: 45,
    },
    {
      id: 'A203',
      name: 'Auditorio',
      type: 'classroom',
      x: 330,
      y: 360,
      width: 220,
      height: 120,
      capacity: 120,
    },
  ];

  private walls: Wall[] = [
    // Paredes exteriores
    { x1: 30, y1: 30, x2: 630, y2: 30 },
    { x1: 630, y1: 30, x2: 630, y2: 500 },
    { x1: 630, y1: 500, x2: 30, y2: 500 },
    { x1: 30, y1: 500, x2: 30, y2: 30 },

    // Paredes internas
    { x1: 30, y1: 140, x2: 630, y2: 140 },
    { x1: 30, y1: 260, x2: 630, y2: 260 },
    { x1: 30, y1: 350, x2: 630, y2: 350 },
    { x1: 460, y1: 30, x2: 460, y2: 140 },
  ];

  ngOnInit() {
    this.createBuildingMap();
  }

  private createBuildingMap() {
    // 1. CREAR SVG PRINCIPAL
    this.svg = d3
      .select(this.mapContainer.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    // 2. GRUPO PRINCIPAL PARA ZOOM/PAN
    this.mainGroup = this.svg.append('g');

    // 3. DIBUJAR PAREDES
    this.mainGroup
      .selectAll('.wall')
      .data(this.walls)
      .enter()
      .append('line')
      .attr('class', 'wall')
      .attr('x1', (d: Wall) => d.x1)
      .attr('y1', (d: Wall) => d.y1)
      .attr('x2', (d: Wall) => d.x2)
      .attr('y2', (d: Wall) => d.y2);

    // 4. DIBUJAR SALONES (RECTÁNGULOS)
    const rooms = this.mainGroup
      .selectAll('.room')
      .data(this.rooms)
      .enter()
      .append('rect')
      .attr('class', 'room')
      .attr('x', (d: Room) => d.x)
      .attr('y', (d: Room) => d.y)
      .attr('width', (d: Room) => d.width)
      .attr('height', (d: Room) => d.height)
      .attr('fill', (d: Room) => this.getRoomColor(d.type))
      .attr('rx', 5) // Bordes redondeados
      .on('click', (_event: any, d: Room) => {
        this.onRoomClick(d);
      });

    // 5. AÑADIR ETIQUETAS DE TEXTO
    this.mainGroup
      .selectAll('.room-label')
      .data(this.rooms)
      .enter()
      .append('text')
      .attr('class', 'room-label')
      .attr('x', (d: Room) => d.x + d.width / 2)
      .attr('y', (d: Room) => d.y + d.height / 2)
      .attr('dy', '0.35em')
      .text((d: Room) => d.id);

    // 6. CONFIGURAR ZOOM Y PAN
    this.zoom = d3
      .zoom()
      .scaleExtent([0.5, 5]) // Min y max zoom
      .on('zoom', (event) => {
        this.mainGroup.attr('transform', event.transform);
      });

    this.svg.call(this.zoom);
  }

  private getRoomColor(type: string): string {
    const colors: { [key: string]: string } = {
      classroom: '#3498db',
      lab: '#e74c3c',
      office: '#2ecc71',
      bathroom: '#95a5a6',
      stairs: '#f39c12',
    };
    return colors[type] || '#bdc3c7';
  }

  getRoomTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      classroom: 'Salón de Clases',
      lab: 'Laboratorio',
      office: 'Oficina',
      bathroom: 'Baño',
      stairs: 'Escaleras',
    };
    return labels[type] || type;
  }

  private onRoomClick(room: Room) {
    // Remover selección anterior
    this.mainGroup.selectAll('.room').classed('selected', false);

    // Seleccionar nuevo salón
    this.selectedRoom = room;
    this.mainGroup
      .selectAll('.room')
      .filter((d: Room) => d.id === room.id)
      .classed('selected', true);
  }

  resetZoom() {
    this.svg
      .transition()
      .duration(750)
      .call(this.zoom.transform, d3.zoomIdentity);
  }

  highlightClassrooms() {
    this.mainGroup
      .selectAll('.room')
      .classed('highlighted', (d: Room) => d.type === 'classroom');
  }

  highlightLabs() {
    this.mainGroup
      .selectAll('.room')
      .classed('highlighted', (d: Room) => d.type === 'lab');
  }
}
