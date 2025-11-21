import { Component, inject } from '@angular/core';
import { FeatureCard } from '@components/feature-card';
import { HeaderComponent } from '@components/header';
import { InfoCardComponent } from '@components/info-card';
import { BuildingMapComponent } from '@components/map-d3';
import { MainController } from '@controllers/main-controller';

@Component({
  selector: 'app-main',
  imports: [BuildingMapComponent, FeatureCard, HeaderComponent, InfoCardComponent],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {
  private readonly controller = inject(MainController);
}
