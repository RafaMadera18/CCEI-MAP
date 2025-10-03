import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapD3 } from './map-d3';

describe('MapD3', () => {
  let component: MapD3;
  let fixture: ComponentFixture<MapD3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapD3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapD3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
