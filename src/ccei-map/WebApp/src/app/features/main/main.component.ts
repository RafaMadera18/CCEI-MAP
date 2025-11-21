import { Component } from '@angular/core';
import { HeaderComponent } from 'app/components/header/header.component';
import { InfoCardComponent } from 'app/components/info-card/info-card';
import { FeatureCard } from 'app/components/feature-card/feature-card';
import { BuildingMapComponent } from '../map/presentation/components';

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
