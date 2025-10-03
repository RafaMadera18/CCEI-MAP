import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [],
  templateUrl: './feature-card.html',
  styleUrl: './feature-card.scss',
})
export class FeatureCard {
  icon = input<string>('');
  title = input<string>('');
  description = input<string>('');
  borderColor = input<string>('');
}
