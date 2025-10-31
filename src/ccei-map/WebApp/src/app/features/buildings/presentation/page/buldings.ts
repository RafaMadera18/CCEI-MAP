import { Component } from '@angular/core';
import { HeaderComponent } from 'app/components/header/header.component';
import { BuldingsList } from '../components/buldings-list/buldings-list';

@Component({
  selector: 'app-buldings',
  imports: [HeaderComponent, BuldingsList],
  templateUrl: './buldings.html',
  styleUrl: './buldings.scss',
})
export class Buldings {}
