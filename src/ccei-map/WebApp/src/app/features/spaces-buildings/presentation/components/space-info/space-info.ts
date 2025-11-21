import { Component, Input } from '@angular/core';
import { Space } from 'app/domain/Spaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-space-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './space-info.html',
  styleUrl: './space-info.scss',
})
export class SpaceInfo {
  @Input() space: Space | null = null;
}
