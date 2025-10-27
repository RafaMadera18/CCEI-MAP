import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { dataMock } from 'app/data/data-mock';
import { extractAllSpaces, getSpaceColor, calculateBounds } from './mapUtils';
import { Space } from 'app/models/Spaces';
import * as d3 from 'd3';

@Component({
  selector: 'app-map-d3',
  templateUrl: './map-d3.html',
  styleUrl: './map-d3.scss',
})
export class BuildingMapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  selectedSpace: Space | null = null;
  private width = 1200;
  private height = 700;
  private svg: any;
  private mainGroup: any;
  private zoom: any;
  private allSpaces: Space[] = [];

  ngOnInit() {
    this.allSpaces = extractAllSpaces(dataMock);
    this.createMap();
  }

  private createMap() {
    const container = this.mapContainer.nativeElement;
    this.width = container.clientWidth;
    this.height = container.clientHeight;
    this.svg = d3
      .select(container)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);
    this.addBackgroundImage();

    this.mainGroup = this.svg.append('g');

    this.zoom = d3
      .zoom()
      .scaleExtent([0.5, 5])
      .on('zoom', (event) => {
        this.mainGroup.attr('transform', event.transform);
      });

    this.svg.call(this.zoom);
    this.renderSpaces();
    this.centerView();
  }

  /**
   * 🎨 Agregar imagen de fondo al SVG
   */
  private addBackgroundImage() {
    const defs = this.svg.append('defs');

    // Crear patrón con la imagen
    const pattern = defs
      .append('pattern')
      .attr('id', 'bgImage')
      .attr('patternUnits', 'objectBoundingBox')
      .attr('width', 1)
      .attr('height', 1);

    pattern
      .append('image')
      .attr(
        'href',
        'https://img.freepik.com/vector-premium/mapa-mundo-fondo-vintage-colorido_153969-6050.jpg?semt=ais_hybrid&w=740&q=80',
      )
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('preserveAspectRatio', 'xMidYMid slice'); // Ajusta la imagen

    // Crear rectángulo con el patrón
    this.svg
      .insert('rect', ':first-child') // Insertar al fondo
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('fill', 'url(#bgImage)')
      .attr('opacity', 0.2) // 👈 Opacidad para no tapar los espacios
      .style('pointer-events', 'none'); // No bloquea clicks
  }

  private renderSpaces() {
    const spaces = this.mainGroup.selectAll('.space').data(this.allSpaces);

    spaces
      .enter()
      .append('rect')
      .attr('class', 'space')
      .attr('x', (space: Space) => space.coordinates.latitude)
      .attr('y', (space: Space) => space.coordinates.longitude)
      .attr('width', (space: Space) => space.dimensions.width)
      .attr('height', (space: Space) => space.dimensions.height)
      .attr('fill', (d: Space) => getSpaceColor(d))
      .attr('stroke', '#2c3e50')
      .attr('stroke-width', 2)
      .attr('rx', 5)
      .attr('ry', 5)
      .style('cursor', 'pointer')
      .on('mouseover', function (this: SVGRectElement, event: any, d: Space) {
        const rect = d3.select(this);
        rect
          .transition()
          .duration(200)
          .attr('stroke-width', 4)
          .style('filter', 'brightness(1.2)');
      })
      .on('mouseout', function (this: SVGRectElement, event: any, d: Space) {
        const rect = d3.select(this);
        const isSelected = rect.classed('selected');
        if (!isSelected) {
          rect
            .transition()
            .duration(200)
            .attr('stroke-width', 2)
            .style('filter', 'none');
        }
      })
      .on('click', (_event: any, d: Space) => {
        if (
          this.selectedSpace == null ||
          this.selectedSpace.spaceId !== d.spaceId
        ) {
          this.onSpaceClick(d);
        } else {
          this.deselectSpace();
        }
      });

    this.mainGroup
      .selectAll('.space-label')
      .data(this.allSpaces)
      .enter()
      .append('text')
      .attr('class', 'space-label')
      .attr('x', (space: Space) => {
        return space.coordinates.latitude + space.dimensions.width / 2;
      })
      .attr('y', (space: Space) => {
        return space.coordinates.longitude + space.dimensions.height / 2;
      })
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .style('pointer-events', 'none')
      .text((space: Space) => space.spaceId);
  }

  private onSpaceClick(space: Space) {
    this.mainGroup
      .selectAll('.space')
      .classed('selected', false)
      .attr('stroke', '#2c3e50')
      .attr('stroke-width', 2)
      .style('filter', 'none');

    this.mainGroup
      .selectAll('.space')
      .filter((d: Space) => d.spaceId === space.spaceId)
      .classed('selected', true)
      .attr('stroke', '#e74c3c')
      .attr('stroke-width', 4)
      .style('filter', 'brightness(1.1)');

    this.selectedSpace = space;
  }

  public deselectSpace() {
    this.mainGroup
      .selectAll('.space')
      .classed('selected', false)
      .attr('stroke', '#2c3e50')
      .attr('stroke-width', 2)
      .style('filter', 'none');

    this.selectedSpace = null;
  }

  public resetZoom() {
    this.svg
      .transition()
      .duration(750)
      .call(this.zoom.transform, d3.zoomIdentity);
  }

  public centerView() {
    const bounds = calculateBounds(this.allSpaces);
    const scale =
      Math.min(this.width / bounds.width, this.height / bounds.height) * 0.9;
    const translateX =
      (this.width - bounds.width * scale) / 2 - bounds.minX * scale;
    const translateY =
      (this.height - bounds.height * scale) / 2 - bounds.minY * scale;

    this.svg
      .transition()
      .duration(750)
      .call(
        this.zoom.transform,
        d3.zoomIdentity.translate(translateX, translateY).scale(scale),
      );
  }

  public zoomIn() {
    this.svg.transition().duration(300).call(this.zoom.scaleBy, 1.3);
  }

  public zoomOut() {
    this.svg.transition().duration(300).call(this.zoom.scaleBy, 0.7);
  }
}
