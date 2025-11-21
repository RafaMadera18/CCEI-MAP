import { Component, input } from '@angular/core';

import { RouterLink } from '@angular/router';
import { Building } from '@domain/entities';

@Component({
  selector: 'app-buldings-list',
  imports: [RouterLink],
  templateUrl: './buldings-list.html',
  styleUrl: './buldings-list.scss',
})
export class BuldingsList {
  buildings = input.required<Building[]>();
}
