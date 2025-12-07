import { Component, Input } from '@angular/core';
import { Space } from '@domain/entities';

@Component({
  selector: 'app-pop-up-map',
  imports: [],
  templateUrl: './pop-up-map.html',
  styleUrl: './pop-up-map.scss',
})
export class PopUpMap {
  @Input() selectedSpaces: Space[] = [];

  get isVisible(): boolean {
    return this.selectedSpaces.length > 0;
  }
}
