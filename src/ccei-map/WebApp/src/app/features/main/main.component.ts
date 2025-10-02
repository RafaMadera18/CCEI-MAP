import { Component } from '@angular/core';
import { HeaderComponent } from 'app/components/header/header.component';
import { Map } from '../map/map';

@Component({
  selector: 'app-main',
  imports: [HeaderComponent, Map],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
