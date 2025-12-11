import { InjectionToken, Provider } from '@angular/core';
import { BuildingMockRepository } from '@data/repositories/building-mock';
import { SpaceMockRepository } from '@data/repositories/space-mock';
import { BuildingRepository } from '@repositories/building-repository';
import { SpaceRepository } from '@repositories/space-repository';
import {
  GetSpaceByIdUseCase,
  GetSpaceByIdUseCaseImpl,
} from '@use-cases/get-space-by-id';
import {
  CalculateSpaceBoundsUseCase,
  CalculateSpaceBoundsUseCaseImpl,
  GetAllBuildingsUseCase,
  GetAllBuildingsUseCaseImpl,
  GetAllSpacesUseCase,
  GetAllSpacesUseCaseImpl,
  GetBuildingByIdUseCase,
  GetBuildingByIdUseCaseImpl,
  GetSpacesByBuildingUseCase,
  GetSpacesByBuildingUseCaseImpl,
} from '@use-cases/index';

// Repository Tokens
export const BUILDING_REPOSITORY = new InjectionToken<BuildingRepository>(
  'BuildingRepository',
  {
    providedIn: 'root',
    factory: () => new BuildingMockRepository(),
  },
);

export const SPACE_REPOSITORY = new InjectionToken<SpaceRepository>(
  'SpaceRepository',
  {
    providedIn: 'root',
    factory: () => new SpaceMockRepository(),
  },
);

// Use Case Tokens
export const GET_ALL_BUILDINGS_USE_CASE =
  new InjectionToken<GetAllBuildingsUseCase>('GetAllBuildingsUseCase');

export const GET_BUILDING_BY_ID_USE_CASE =
  new InjectionToken<GetBuildingByIdUseCase>('GetBuildingByIdUseCase');

export const GET_SPACES_BY_BUILDING_USE_CASE =
  new InjectionToken<GetSpacesByBuildingUseCase>('GetSpacesByBuildingUseCase');

export const GET_ALL_SPACES_USE_CASE = new InjectionToken<GetAllSpacesUseCase>(
  'GetAllSpacesUseCase',
);

export const GET_SPACE_BY_ID_USE_CASE = new InjectionToken<GetSpaceByIdUseCase>(
  'GetSpaceByIdUseCase',
);

export const CALCULATE_SPACE_BOUNDS_USE_CASE =
  new InjectionToken<CalculateSpaceBoundsUseCase>(
    'CalculateSpaceBoundsUseCase',
  );

// Providers Array
export const CORE_PROVIDERS: Provider[] = [
  // Use Cases
  {
    provide: GET_ALL_BUILDINGS_USE_CASE,
    useFactory: (repo: BuildingRepository) =>
      new GetAllBuildingsUseCaseImpl(repo),
    deps: [BUILDING_REPOSITORY],
  },
  {
    provide: GET_BUILDING_BY_ID_USE_CASE,
    useFactory: (repo: BuildingRepository) =>
      new GetBuildingByIdUseCaseImpl(repo),
    deps: [BUILDING_REPOSITORY],
  },
  {
    provide: GET_SPACES_BY_BUILDING_USE_CASE,
    useFactory: (repo: BuildingRepository) =>
      new GetSpacesByBuildingUseCaseImpl(repo),
    deps: [BUILDING_REPOSITORY],
  },
  {
    provide: GET_ALL_SPACES_USE_CASE,
    useFactory: (repo: BuildingRepository) => new GetAllSpacesUseCaseImpl(repo),
    deps: [BUILDING_REPOSITORY],
  },
  {
    provide: GET_SPACE_BY_ID_USE_CASE,
    useFactory: (repo: SpaceRepository) => new GetSpaceByIdUseCaseImpl(repo),
    deps: [SPACE_REPOSITORY],
  },
  {
    provide: CALCULATE_SPACE_BOUNDS_USE_CASE,
    useClass: CalculateSpaceBoundsUseCaseImpl,
  },
];
