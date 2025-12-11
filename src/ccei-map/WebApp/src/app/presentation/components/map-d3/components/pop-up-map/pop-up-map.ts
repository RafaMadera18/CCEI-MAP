import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Space } from '@domain/entities';

@Component({
  selector: 'app-pop-up-map',
  imports: [RouterLink],
  templateUrl: './pop-up-map.html',
  styleUrl: './pop-up-map.scss',
})
export class PopUpMap {
  @Input() selectedSpaces: Space[] = [];

  get isVisible(): boolean {
    return this.selectedSpaces.length > 0;
  }
}
