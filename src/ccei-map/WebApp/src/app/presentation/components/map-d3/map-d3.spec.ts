import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { GET_ALL_SPACES_USE_CASE } from '@di/dependencies-provider';

import { BuildingMapComponent } from './map-d3';

describe('MapD3', () => {
  let component: BuildingMapComponent;
  let fixture: ComponentFixture<BuildingMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildingMapComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: GET_ALL_SPACES_USE_CASE,
          useValue: { execute: () => [] }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BuildingMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
