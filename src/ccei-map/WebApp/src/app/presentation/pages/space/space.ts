import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@components/header';
import { Space } from '@domain/entities/space';
import { SpaceType } from '@domain/enums';
import { SpacesController } from '@controllers/spaces-controller';

@Component({
  selector: 'app-space',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './space.html',
  styleUrl: './space.scss',
})
export class SpacePage implements OnInit {
  private route = inject(ActivatedRoute);
  private readonly controller = inject(SpacesController);

  spaceId: string = '';
  space: Space | null = null;
  SpaceType = SpaceType;

  ngOnInit() {
    this.spaceId = this.route.snapshot.paramMap.get('id') || '';
    this.space = this.controller.getSpaceById(this.spaceId);
  }

  getSpaceTypeLabel(type: SpaceType): string {
    const labels: Record<SpaceType, string> = {
      [SpaceType.CLASSROOM]: 'Aula',
      [SpaceType.LABORATORY]: 'Laboratorio',
      [SpaceType.OFFICE]: 'Oficina',
    };
    return labels[type] || type;
  }
}
