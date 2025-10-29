import { Component } from '@angular/core';
import { Space } from 'app/models/Spaces';
import { SpacesList } from 'app/components/buldings/spaces-list/spaces-list';
import { SpaceInfo } from 'app/components/buldings/space-info/space-info';
import { HeaderComponent } from 'app/components/header/header.component';

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
