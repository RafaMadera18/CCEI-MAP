import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacesList } from './spaces-list';

describe('SpacesList', () => {
  let component: SpacesList;
  let fixture: ComponentFixture<SpacesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpacesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpacesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
