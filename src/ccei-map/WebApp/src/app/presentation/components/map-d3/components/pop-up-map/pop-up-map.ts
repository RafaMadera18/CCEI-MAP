import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Space } from '@domain/entities';
import { Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-pop-up-map',
  imports: [RouterLink],
  templateUrl: './pop-up-map.html',
  styleUrl: './pop-up-map.scss',

})
export class PopUpMap {
  @Input() selectedSpaces: Space[] = [];
  @Output() onCalculateClicked = new EventEmitter<void>();

  get isVisible(): boolean {
    return this.selectedSpaces.length > 0;
  }
}
