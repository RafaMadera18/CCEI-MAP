import { Component } from '@angular/core';
import { BuldingsList } from 'app/components/buldings/buldings-list/buldings-list';
import { HeaderComponent } from 'app/components/header/header.component';

@Component({
  selector: 'app-buldings',
  imports: [HeaderComponent, BuldingsList],
  templateUrl: './buldings.html',
  styleUrl: './buldings.scss',
})
export class Buldings {}
