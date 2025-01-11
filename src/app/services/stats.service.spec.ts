import { TestBed } from '@angular/core/testing';

import { StatsService } from './stats.service';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ActivitiesService, AthletesService, Configuration } from '../open-api/strava';
import { of } from 'rxjs';

describe('StatsService', () => {
  let service: StatsService;
  const mockAuthService = jasmine.createSpyObj<AuthService>('AuthService', {
    config: new Configuration({
            basePath: `/api/v3`,
            credentials: { strava_oauth: '' }
          })
  })
  const mockActivitiesService = jasmine.createSpyObj('ActivitiesService', {
    getLoggedInAthleteActivities: of(null)
  })
  const mockAthletesService = jasmine.createSpyObj('AthletesService', {
    getLoggedInAthlete: of(null),
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(),
        {provide: AuthService, useValue: mockAuthService},
        {provide: ActivitiesService, useValue: mockActivitiesService},
        {provide: AthletesService, useValue: mockAthletesService}
      ]
    });
    service = TestBed.inject(StatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
