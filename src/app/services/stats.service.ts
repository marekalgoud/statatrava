import { inject, Injectable, signal, Signal } from '@angular/core';
import { AthletesService, ActivitiesService, DetailedAthlete, SummaryActivity } from '../open-api/strava';
import { AuthService } from './auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { expand, of, reduce, takeWhile, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  athletesService = inject(AthletesService);
  activitiesService = inject(ActivitiesService);
  auth = inject(AuthService)

  private localStorageAthlete = window.localStorage.getItem('athlete')
  private _athlete: Signal<DetailedAthlete| undefined> = signal(this.localStorageAthlete ? JSON.parse(this.localStorageAthlete): undefined);

  private localStorageActivities = window.localStorage.getItem('activities')
  private _activities: Signal<SummaryActivity[]| undefined> = signal(this.localStorageActivities ? JSON.parse(this.localStorageActivities): undefined);


  constructor() {
    this.athletesService.configuration = this.auth.config
    this.activitiesService.configuration = this.auth.config
  }

  get athlete():Signal<DetailedAthlete| undefined> {
    if(this._athlete()) {
      return this._athlete
    } else {
      return toSignal(
        this.athletesService.getLoggedInAthlete().pipe(
          tap((athlete) => window.localStorage.setItem('athlete',JSON.stringify(athlete)))
        )
      )
    }
  }

  getActivities(before: number | undefined = undefined, after: number | undefined = undefined):Signal<SummaryActivity[] | undefined> {
    if(this._activities()) {
      return this._activities
    } else {
      let page = 1
      return toSignal(this.activitiesService.getLoggedInAthleteActivities(before,after, page, 100).pipe(
        expand(response => {
          if (response.length == 0) {
            return of();
          }
          page++;
          return this.activitiesService.getLoggedInAthleteActivities(before,after, page, 100)
        }
        ),
          takeWhile(response => response && response.length > 0),
          reduce((acc, response) => acc.concat(response as SummaryActivity[]), [] as SummaryActivity[]),
          tap((activities) => window.localStorage.setItem('activities',JSON.stringify(activities)))
      ))
    }
  }
}
