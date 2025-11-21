import { Component } from '@angular/core';
import { dataMock } from 'app/data/data-mock';
import { Building } from 'app/core/Spaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-buldings-list',
  imports: [RouterLink],
  templateUrl: './buldings-list.html',
  styleUrl: './buldings-list.scss',
})
export class BuldingsList {
  constructor() {}
  buildings: Building[] = dataMock;
}
