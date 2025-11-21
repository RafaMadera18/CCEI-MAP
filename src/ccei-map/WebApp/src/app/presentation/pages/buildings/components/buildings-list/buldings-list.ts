import { Component, input } from '@angular/core';

import { RouterLink } from '@angular/router';
import { Building, Space } from '@domain/entities';

@Component({
  selector: 'app-buldings-list',
  imports: [RouterLink],
  templateUrl: './buldings-list.html',
  styleUrl: './buldings-list.scss',
})
export class BuldingsList {
  buildings = input.required<Building[]>();

  getSpaceType(space: Space): string {
    const type = space.constructor.name;
    const typeMap: Record<string, string> = {
      'Classroom': 'Aula',
      'Laboratory': 'Laboratorio',
      'Office': 'Oficina'
    };
    return typeMap[type] || 'Espacio';
  }
}
