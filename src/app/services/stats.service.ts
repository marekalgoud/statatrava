import { inject, Injectable, signal, Signal } from '@angular/core';
import { AthletesService, ActivitiesService, DetailedAthlete, SummaryActivity } from '../open-api/strava';
import { AuthService } from './auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, expand, map, of, reduce, takeWhile, tap } from 'rxjs';
import dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  athletesService = inject(AthletesService);
  activitiesService = inject(ActivitiesService);
  auth = inject(AuthService)

  private localStorageAthlete: string | null
  private _athlete = signal<DetailedAthlete|undefined>(undefined)
  private localStorageActivities:string | null
  private _activities = signal<SummaryActivity[]>([])
  private _hasError = signal<boolean>(false)

  constructor() {
    this.athletesService.configuration = this.auth.config
    this.activitiesService.configuration = this.auth.config

    this.localStorageAthlete = window.localStorage.getItem('athlete')
    this.localStorageActivities = window.localStorage.getItem('activities')

    this._athlete.set(this.localStorageAthlete ? JSON.parse(this.localStorageAthlete): undefined)
    this._activities.set(this.localStorageActivities ? JSON.parse(this.localStorageActivities): undefined)
  }

  get hasError():Signal<boolean> {
    return this._hasError
  }

  get athlete():Signal<DetailedAthlete| undefined> {
    if(this._athlete()) {
      return this._athlete
    } else {
      return toSignal(
        this.athletesService.getLoggedInAthlete().pipe(
          tap((athlete) => {
            window.localStorage.setItem('athlete',JSON.stringify(athlete))
            this._athlete.set(athlete)
          })
        )
      )
    }
  }

  get activities():Signal<SummaryActivity[] | undefined> {
    if(this._activities()) {
      const dateOfLastActivities = this._activities().map(activity => dayjs(activity.start_date).unix()).sort().reverse()[0]
      let page = 1
      return toSignal(this.activitiesService.getLoggedInAthleteActivities(undefined,dateOfLastActivities, page, 100).pipe(
          tap(() => this._hasError.set(false)),
          expand(response => {
            if (response.length == 0) {
              return of();
            }
            page++;
            return this.activitiesService.getLoggedInAthleteActivities(undefined,dateOfLastActivities, page, 100)
          }),
          takeWhile(response => response && response.length > 0),
          reduce((acc, response) => acc.concat(response as SummaryActivity[]), [...(this._activities() || [])]),
          map((activities) => activities.sort((a,b) => dayjs(b.start_date).unix() - dayjs(a.start_date).unix())),
          tap((activities) => {
            window.localStorage.setItem('activities',JSON.stringify(activities))
            this._activities.set(activities)
          }),
          catchError(() => {
            this._hasError.set(true);
            return of(undefined)
          })
      ))
    } else {
      let page = 1
      return toSignal(this.activitiesService.getLoggedInAthleteActivities(undefined,undefined, page, 100).pipe(
        expand(response => {
          if (response.length == 0) {
            return of();
          }
          page++;
          return this.activitiesService.getLoggedInAthleteActivities(undefined,undefined, page, 100)
        }
        ),
          takeWhile(response => response && response.length > 0),
          reduce((acc, response) => acc.concat(response as SummaryActivity[]), [] as SummaryActivity[]),
          tap((activities) => {
            window.localStorage.setItem('activities',JSON.stringify(activities))
            this._activities.set(activities)
          })
      ))
    }
  }
}
