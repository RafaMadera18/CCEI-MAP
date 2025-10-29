import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacesBuildings } from './spaces-buildings';

describe('SpacesBuildings', () => {
  let component: SpacesBuildings;
  let fixture: ComponentFixture<SpacesBuildings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpacesBuildings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpacesBuildings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
