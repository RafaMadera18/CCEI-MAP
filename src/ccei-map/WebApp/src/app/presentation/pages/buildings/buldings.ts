import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '@components/index';
import { BuldingsList } from './components/buildings-list';
import { Building } from '@domain/entities';
import { BuildingsController } from '@controllers/buildings-controller';

@Component({
  selector: 'app-buldings',
  imports: [HeaderComponent, BuldingsList],
  templateUrl: './buldings.html',
  styleUrl: './buldings.scss',
})
export class Buldings implements OnInit{

  buildings: Building[] = [];
  private readonly controller = inject(BuildingsController);

  ngOnInit(): void {
    this.loadBuildings();
  }

  private loadBuildings(): void {
    this.buildings = this.controller.getAllBuildings();
  }
}
