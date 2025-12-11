import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { FeatureCard } from './feature-card';

describe('FeatureCard', () => {
  let component: FeatureCard;
  let fixture: ComponentFixture<FeatureCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureCard],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
