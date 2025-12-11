import * as d3 from "d3";
import { Space } from "@domain/entities";
import { Street } from "@domain/entities/street";
import { getSpaceColor, calculateBounds } from "./mapUtils";
import { Subject } from "rxjs";

export class MapRenderer {
  public onSelectionChange$ = new Subject<Space[]>();

  private readonly width: number;
  private readonly height: number;

  private svg: any;
  private mainGroup: any;
  private zoom: any;

  private selectedSpaces: Space[] = [];

  constructor(private readonly container: HTMLElement) {
    this.width = container.clientWidth;
    this.height = container.clientHeight;
    this.initialize();
  }

  private initialize() {
    this.svg = d3
      .select(this.container)
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    this.addBackgroundImage();
    this.createGradients();

    this.mainGroup = this.svg.append("g");

    this.zoom = d3
      .zoom()
      .scaleExtent([0.5, 5])
      .on("zoom", (event: any) => {
        this.mainGroup.attr("transform", event.transform);
      });

    this.svg.call(this.zoom);
  }

  public render(spaces: Space[], streets: Street[]) {
    this.mainGroup.selectAll("*").remove();
    this.renderStreets(streets);
    this.renderSpaces(spaces);
    this.centerView(spaces);
  }

  public zoomIn() {
    this.svg.transition().duration(300).call(this.zoom.scaleBy, 1.3);
  }

  public zoomOut() {
    this.svg.transition().duration(300).call(this.zoom.scaleBy, 0.7);
  }

  private renderSpaces(spaces: Space[]) {
    const spacesGroup = this.mainGroup.selectAll(".space").data(spaces);

    spacesGroup
      .enter()
      .append("rect")
      .attr("class", "space")
      .attr("x", (d: Space) => d.coordinates.latitude)
      .attr("y", (d: Space) => d.coordinates.longitude)
      .attr("width", (d: Space) => d.dimensions.width)
      .attr("height", (d: Space) => d.dimensions.height)
      .attr("fill", (d: Space) => getSpaceColor(d))
      .attr("stroke", "#2c3e50")
      .attr("stroke-width", 2)
      .attr("rx", 5)
      .attr("ry", 5)
      .style("cursor", "pointer")
      .on("click", (_event: any, d: Space) => this.handleSpaceClick(d))
      .on("mouseover", function (this: any, _e: any, d: Space) {
        // Lógica visual hover simple (opcional)
        if (!d3.select(this).classed("selected")) {
          d3.select(this).style("filter", "brightness(1.2)");
        }
      })
      .on("mouseout", function (this: any) {
        if (!d3.select(this).classed("selected")) {
          d3.select(this).style("filter", "none");
        }
      });

    this.mainGroup
      .selectAll(".space-label")
      .data(spaces)
      .enter()
      .append("text")
      .attr("class", "space-label")
      .attr("x", (d: Space) => d.coordinates.latitude + d.dimensions.width / 2)
      .attr(
        "y",
        (d: Space) => d.coordinates.longitude + d.dimensions.height / 2,
      )
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "white")
      .attr("font-size", "14px")
      .style("pointer-events", "none")
      .text((d: Space) => d.spaceId);
  }

  private handleSpaceClick(space: Space) {
    const isAlreadySelected = this.selectedSpaces.some(
      (s) => s.spaceId === space.spaceId,
    );

    if (isAlreadySelected) {
      this.selectedSpaces = this.selectedSpaces.filter(
        (s) => s.spaceId !== space.spaceId,
      );
      this.updateSpaceVisual(space, false);
    } else {
      if (this.selectedSpaces.length >= 2) {
        const removed = this.selectedSpaces.shift();
        if (removed) this.updateSpaceVisual(removed, false);
      }
      this.selectedSpaces.push(space);
      this.updateSpaceVisual(space, true);
    }
    this.onSelectionChange$.next(this.selectedSpaces);
  }

  private updateSpaceVisual(space: Space, isSelected: boolean) {
    const element = this.mainGroup
      .selectAll(".space")
      .filter((d: Space) => d.spaceId === space.spaceId);

    if (isSelected) {
      element
        .classed("selected", true)
        .attr("stroke", "#fff")
        .attr("fill", "#e74c3c");
    } else {
      element
        .classed("selected", false)
        .attr("stroke", "#2c3e50")
        .attr("fill", getSpaceColor(space));
    }
  }

  public centerView(spaces: Space[]) {
    const bounds = calculateBounds(spaces);
    const scale =
      Math.min(this.width / bounds.width, this.height / bounds.height) * 0.9;
    const x = (this.width - bounds.width * scale) / 2 - bounds.minX * scale;
    const y = (this.height - bounds.height * scale) / 2 - bounds.minY * scale;

    this.svg
      .transition()
      .duration(750)
      .call(this.zoom.transform, d3.zoomIdentity.translate(x, y).scale(scale));
  }

  private addBackgroundImage() {
    const defs = this.svg.append("defs");

    const pattern = defs
      .append("pattern")
      .attr("id", "bgImage")
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", 1)
      .attr("height", 1);

    pattern
      .append("image")
      .attr("href", "assets/fondoMapa.png")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("preserveAspectRatio", "xMidYMid slice");

    this.svg
      .insert("rect", ":first-child")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("fill", "url(#bgImage)")
      .attr("opacity", 0.2)
      .style("pointer-events", "none");
  }

  private createGradients() {
    const defs = this.svg.select("defs").empty()
      ? this.svg.append("defs")
      : this.svg.select("defs");

    const classroomGradient = defs
      .append("linearGradient")
      .attr("id", "gradient-classroom")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%");

    classroomGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#66BB6A")
      .attr("stop-opacity", 1);

    classroomGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#2E7D32")
      .attr("stop-opacity", 1);

    const officeGradient = defs
      .append("linearGradient")
      .attr("id", "gradient-office")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%");

    officeGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#42A5F5")
      .attr("stop-opacity", 1);

    officeGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#1565C0")
      .attr("stop-opacity", 1);

    // Gradiente para LABORATORY (Naranja)
    const laboratoryGradient = defs
      .append("linearGradient")
      .attr("id", "gradient-laboratory")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%");

    laboratoryGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#FFB74D")
      .attr("stop-opacity", 1);

    laboratoryGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#E65100")
      .attr("stop-opacity", 1);

    // Gradiente por defecto (Gris)
    const defaultGradient = defs
      .append("linearGradient")
      .attr("id", "gradient-default")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%");

    defaultGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#BDBDBD")
      .attr("stop-opacity", 1);

    defaultGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#616161")
      .attr("stop-opacity", 1);
  }

  private renderStreets(streets: Street[]) {
    const streetsGroup = this.mainGroup.append("g").attr("class", "streets");

    streets.forEach((street) => {
      const streetGroup = streetsGroup.append("g");

      street.segments.forEach((segment) => {
        const x1 = segment.startPosition.x;
        const y1 = segment.startPosition.y;
        const x2 = segment.endPosition.x;
        const y2 = segment.endPosition.y;

        const isHorizontal = Math.abs(y2 - y1) < Math.abs(x2 - x1);

        if (isHorizontal) {
          const width = Math.abs(x2 - x1);
          const height = segment.width;

          streetGroup
            .append("rect")
            .attr("x", Math.min(x1, x2))
            .attr("y", y1 - height / 2)
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "#646464")
            .attr("opacity", 0.8);
        } else {
          const width = segment.width;
          const height = Math.abs(y2 - y1);

          streetGroup
            .append("rect")
            .attr("x", x1 - width / 2)
            .attr("y", Math.min(y1, y2))
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "#646464")
            .attr("opacity", 0.8);
        }
      });
      if (street.name && street.segments.length > 0) {
        const firstSegment = street.segments[0];
        const midX =
          (firstSegment.startPosition.x + firstSegment.endPosition.x) / 2;
        const midY =
          (firstSegment.startPosition.y + firstSegment.endPosition.y) / 2;
        streetGroup
          .append("text")
          .attr("x", midX)
          .attr("y", midY - 15)
          .attr("text-anchor", "middle")
          .attr("fill", "#95a5a6")
          .attr("font-size", "12px")
          .attr("font-weight", "bold")
          .style("pointer-events", "none")
          .text(street.name);
      }
    });
  }
}
