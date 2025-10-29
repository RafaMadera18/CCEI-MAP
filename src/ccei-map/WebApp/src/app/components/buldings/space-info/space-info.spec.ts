import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceInfo } from './space-info';

describe('SpaceInfo', () => {
  let component: SpaceInfo;
  let fixture: ComponentFixture<SpaceInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
