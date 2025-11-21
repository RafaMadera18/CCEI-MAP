import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuldingsList } from './buldings-list';

describe('BuldingsList', () => {
  let component: BuldingsList;
  let fixture: ComponentFixture<BuldingsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuldingsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuldingsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
