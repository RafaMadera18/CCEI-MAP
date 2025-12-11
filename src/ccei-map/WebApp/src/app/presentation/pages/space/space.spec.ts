import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';
import { SpacesController } from '@controllers/spaces-controller';
import { SpacePage } from './space';

class MockSpacesController {
  getSpaceById() {
    return null;
  }
}

describe('SpacePage', () => {
  let component: SpacePage;
  let fixture: ComponentFixture<SpacePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpacePage],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: SpacesController, useClass: MockSpacesController }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
