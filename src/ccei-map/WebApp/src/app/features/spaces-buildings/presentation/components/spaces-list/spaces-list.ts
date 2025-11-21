import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Building, Space } from 'app/core/Spaces';
import { dataMock } from 'app/data/data-mock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spaces-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spaces-list.html',
  styleUrl: './spaces-list.scss',
})
export class SpacesList implements OnInit {
  building: Building | null = null;
  selectedSpaceId: string | null = null;

  @Output() spaceSelected = new EventEmitter<Space>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getBuildingId();
  }

  private getBuildingId(): void {
    const buldingId = this.route.snapshot.paramMap.get('id');
    this.building = dataMock.find((b) => b.id === buldingId)!;
  }

  onSpaceClick(space: Space): void {
    this.selectedSpaceId = space.spaceId;
    this.spaceSelected.emit(space);
  }
}
