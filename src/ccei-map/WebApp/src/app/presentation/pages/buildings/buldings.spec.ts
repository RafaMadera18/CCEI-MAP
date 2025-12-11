import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { GET_ALL_BUILDINGS_USE_CASE, GET_BUILDING_BY_ID_USE_CASE } from '@di/dependencies-provider';
import { provideRouter } from '@angular/router';

import { Buldings } from './buldings';

describe('Buldings', () => {
  let component: Buldings;
  let fixture: ComponentFixture<Buldings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Buldings],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: GET_ALL_BUILDINGS_USE_CASE,
          useValue: { execute: () => [] }
        },
        {
          provide: GET_BUILDING_BY_ID_USE_CASE,
          useValue: { execute: () => null }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Buldings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
