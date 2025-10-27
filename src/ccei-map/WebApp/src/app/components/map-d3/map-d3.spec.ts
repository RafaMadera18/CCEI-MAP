import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingMapComponent } from './map-d3';

describe('MapD3', () => {
  let component: BuildingMapComponent;
  let fixture: ComponentFixture<BuildingMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildingMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BuildingMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
