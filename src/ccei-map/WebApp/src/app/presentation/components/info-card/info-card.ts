import { Component, input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  standalone: true,
  templateUrl: './info-card.html',
  styleUrl: './info-card.scss',
})
export class InfoCardComponent {
  title = input<string>('');
  description = input<string>('');
  gradient = input<'purple' | 'blue' | 'green' | 'orange' | 'pink'>('purple');
}
