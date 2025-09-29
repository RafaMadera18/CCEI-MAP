import { Component, OnInit } from "@angular/core";

import Konva from "konva";

class Vector2 {
  constructor(
    readonly x: number,
    readonly y: number,
  ) {}
}

class Room {
  constructor(readonly name: string) {}

  color(): string {
    return this.name == "WC" ? "#0e71b5" : "#bbdefb";
  }
}

class Floor {
  constructor(
    readonly name: string,
    readonly room: readonly Room[],
  ) {}
}

class Building {
  constructor(
    readonly name: string,
    readonly position: Vector2,
    readonly size: Vector2,
    readonly floor: readonly Floor[],
  ) {}
}

@Component({
  selector: "app-map",
  imports: [],
  templateUrl: "./map.html",
  styleUrl: "./map.scss",
})
export class Map implements OnInit {
  ngOnInit() {
    this.initBlueprint();
  }

  static range(start: number, count: number): number[] {
    return Array.from({ length: count }, (_, i) => start + i);
  }

  static drawGrid(
    layer: Konva.Layer,
    width: number,
    height: number,
    spacing = 50,
  ) {
    const gridGroup = new Konva.Group();

    // Vertical lines
    for (let x = 0; x <= width; x += spacing) {
      const line = new Konva.Line({
        points: [x, 0, x, height],
        stroke: "#e0e0e0",
        strokeWidth: 1,
      });
      gridGroup.add(line);

      // X coordinate label
      const label = new Konva.Text({
        x: x + 2,
        y: 2,
        text: `${x}`,
        fontSize: 10,
        fill: "gray",
      });
      gridGroup.add(label);
    }

    // Horizontal lines
    for (let y = 0; y <= height; y += spacing) {
      const line = new Konva.Line({
        points: [0, y, width, y],
        stroke: "#e0e0e0",
        strokeWidth: 1,
      });
      gridGroup.add(line);

      // Y coordinate label
      const label = new Konva.Text({
        x: 2,
        y: y + 2,
        text: `${y}`,
        fontSize: 10,
        fill: "gray",
      });
      gridGroup.add(label);
    }

    layer.add(gridGroup);
  }

  initBlueprint() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const stage = new Konva.Stage({
      container: "container",
      width,
      height,
      draggable: true,
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    Map.drawGrid(layer, width, height, 50);

    const buildings = [
      new Building("C", new Vector2(300, 300), new Vector2(150, 80), [
        new Floor("PB", [
          ...Map.range(1, 5).map((i) => new Room(`C${i}`)),
          new Room("WC"),
        ]),
        new Floor(
          "PA",
          Map.range(6, 5).map((i) => new Room(`C${i}`)),
        ),
      ]),
      new Building("H", new Vector2(500, 200), new Vector2(150, 80), [
        new Floor("PB", [
          new Room("WC"),
          ...Map.range(1, 4).map((i) => new Room(`H${i}`)),
        ]),
        new Floor(
          "PA",
          Map.range(5, 4).map((i) => new Room(`H${i}`)),
        ),
      ]),
    ];

    const path = new Konva.Line({
      points: [300, 390, 650, 390, /**/ 475, 390, 475, 290, 650, 290],
      stroke: "#a1887f",
      strokeWidth: 20,
      lineCap: "round",
      lineJoin: "round",
    });
    layer.add(path);

    buildings.forEach((b) => {
      // Divide by floors (horizontal split)
      const floorHeight = b.size.y / b.floor.length;

      b.floor.forEach((f, floorIndex) => {
        const y =
          b.position.y + (b.floor.length - 1 - floorIndex) * floorHeight;

        // Draw floor background
        const floorRect = new Konva.Rect({
          x: b.position.x,
          y,
          width: b.size.x,
          height: floorHeight,
          stroke: "black",
          strokeWidth: 1,
        });
        layer.add(floorRect);

        // Divide by rooms (vertical split)
        const roomWidth = b.size.x / f.room.length;

        f.room.forEach((r, roomIndex) => {
          const x = b.position.x + roomIndex * roomWidth;

          const roomRect = new Konva.Rect({
            x,
            y,
            width: roomWidth,
            height: floorHeight,
            fill: r.color(),
            stroke: "black",
            strokeWidth: 0.5,
            name: r.name,
          });

          // Highlight on hover
          roomRect.on("mouseover", () => {
            document.body.style.cursor = "pointer";
            roomRect.fill("#64b5f6");
            layer.batchDraw();
          });

          roomRect.on("mouseout", () => {
            document.body.style.cursor = "default";
            roomRect.fill(r.color());
            layer.batchDraw();
          });

          // Alert on click
          roomRect.on("click", () => {
            alert(
              `Clicked on room: ${r.name} (Floor ${f.name}, Building ${b.name})`,
            );
          });

          layer.add(roomRect);

          // Room label
          const label = new Konva.Text({
            x,
            y,
            width: roomWidth,
            height: floorHeight,
            text: r.name,
            align: "center",
            verticalAlign: "middle",
            fontSize: 12,
            fill: "black",
            listening: false,
          });
          layer.add(label);
        });
      });
    });

    stage.on("wheel", (e: any) => {
      e.evt.preventDefault();

      const scaleBy = 1.05;
      const oldScale = stage.scaleX();
      const pointer = stage.getPointerPosition();

      if (!pointer) return;

      const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };

      const direction = e.evt.deltaY > 0 ? -1 : 1;
      const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

      stage.scale({ x: newScale, y: newScale });

      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };

      stage.position(newPos);
      stage.batchDraw();
    });
  }
}
