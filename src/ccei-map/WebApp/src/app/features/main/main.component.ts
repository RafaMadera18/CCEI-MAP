import { Component } from '@angular/core';
import { HeaderComponent } from 'app/components/header/header.component';
import { Map } from '../map/map';
import { InfoCardComponent } from 'app/components/info-card/info-card';
import { FeatureCard } from 'app/components/feature-card/feature-card';
import { BuildingMapComponent } from 'app/components/map-d3/map-d3';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    HeaderComponent,
    InfoCardComponent,
    FeatureCard,
    BuildingMapComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
