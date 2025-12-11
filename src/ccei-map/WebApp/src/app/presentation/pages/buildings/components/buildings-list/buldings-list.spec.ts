import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

import { BuldingsList } from './buldings-list';

describe('BuldingsList', () => {
  let component: BuldingsList;
  let fixture: ComponentFixture<BuldingsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuldingsList],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuldingsList);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('buildings', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
