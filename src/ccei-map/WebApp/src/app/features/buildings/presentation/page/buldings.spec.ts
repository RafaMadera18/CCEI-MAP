import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Buldings } from './buldings';

describe('Buldings', () => {
  let component: Buldings;
  let fixture: ComponentFixture<Buldings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Buldings],
    }).compileComponents();

    fixture = TestBed.createComponent(Buldings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
