import { Component } from '@angular/core';
import { Space } from 'app/models/Spaces';
import { HeaderComponent } from 'app/components/header/header.component';
import { SpaceInfo, SpacesList } from '../components';

@Component({
  selector: 'app-spaces-buildings',
  imports: [SpacesList, SpaceInfo, HeaderComponent],
  templateUrl: './spaces-buildings.html',
  styleUrl: './spaces-buildings.scss',
})
export class SpacesBuildings {
  selectedSpace: Space | null = null;

  onSpaceSelected(space: Space) {
    if (this.selectedSpace == space) {
      this.selectedSpace = null;
    } else {
      this.selectedSpace = space;
    }
  }
}
