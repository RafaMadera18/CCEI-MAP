import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { GET_ALL_SPACES_USE_CASE } from '@di/dependencies-provider';
import { provideRouter } from '@angular/router';

import { Main } from './main';

describe('Main', () => {
  let component: Main;
  let fixture: ComponentFixture<Main>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Main],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: GET_ALL_SPACES_USE_CASE,
          useValue: { execute: () => [] }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Main);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
