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

@Component({
  selector: 'app-map-d3',
  templateUrl: './map-d3.html',
  styleUrl: './map-d3.scss',
  imports: [PopUpMap],
})
export class BuildingMapComponent implements OnInit, OnDestroy {
  private readonly controller = inject(MainController);

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
    const streets = createStreetsMock();
    this.mapRenderer.render(spaces, streets);
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
