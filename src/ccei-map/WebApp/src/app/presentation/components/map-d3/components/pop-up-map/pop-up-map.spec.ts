import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpMap } from './pop-up-map';

describe('PopUpMap', () => {
  let component: PopUpMap;
  let fixture: ComponentFixture<PopUpMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
