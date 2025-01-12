import { booleanAttribute, Component, computed, input, OnChanges } from '@angular/core';
import { SummaryActivity } from '../../open-api/strava';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import dayjs from 'dayjs';
import { TimeFormatPipe } from '../../pipe/timeFormat.pipe';

const CO2 = 0.21743;

@Component({
  selector: 'app-month-stats',
  templateUrl: './month-stats.component.html',
  styleUrl: './month-stats.component.css',
  imports: [DatePipe, TimeFormatPipe, DecimalPipe, CommonModule]
})
export class MonthStatsComponent implements OnChanges {

  day = input.required<string>()
  activities = input<SummaryActivity[]>([])
  types = input<string[]|null>(null)
  commute = input(false, { transform: booleanAttribute })
  lastYearDay = computed(() => dayjs(this.day()).subtract(1, 'year').format())

  activitiesOfTheMonth = computed(() => {
    return this.activities()?.
    filter((activity: SummaryActivity) => {
      const types = this.types()
      if(types && types?.length > 0) {
        return activity.sport_type && types.includes(activity.sport_type)
      }
      return true
    }).
    filter((activitiy: SummaryActivity) => {
      if(this.commute()) {
        return activitiy.commute
      }
      return true
    }).
    filter((activity:SummaryActivity) => {
      const activityDate = dayjs(activity.start_date)
      return activityDate.isAfter(dayjs(this.day())) && activityDate.isBefore(dayjs(this.day()).endOf('month'))
    })
  })

  activitiesOfTheMonthLastYear = computed(() => {
    return this.activities()?.
    filter((activity: SummaryActivity) => {
      const types = this.types()
      if(types && types?.length > 0) {
        return activity.sport_type && types.includes(activity.sport_type)
      }
      return true
    }).
    filter((activitiy: SummaryActivity) => {
      if(this.commute()) {
        return activitiy.commute
      }
      return true
    }).
    filter((activity:SummaryActivity) => {
      const activityDate = dayjs(activity.start_date)
      return activityDate.isAfter(dayjs(this.day()).subtract(1, 'year')) && activityDate.isBefore(dayjs(this.day()).subtract(1, 'year').endOf('month'))
    })
  })

  km = computed(() => {
    const meters = this.activitiesOfTheMonth()?.map((activity: SummaryActivity) => activity.distance || 0).reduce((a, b) => a + b, 0) || 0
    return meters / 1000
  })

  co2 = computed(() => this.km() * CO2 )

  kmLastYear = computed(() => {
    const meters = this.activitiesOfTheMonthLastYear()?.map((activity: SummaryActivity) => activity.distance || 0).reduce((a, b) => a + b, 0) || 0
    return meters / 1000
  })

  co2LastYear = computed(() => this.kmLastYear() * CO2)

  time = computed(() => {
    const secondes = this.activitiesOfTheMonth()?.map((activity: SummaryActivity) => activity.elapsed_time || 0).reduce((a, b) => a + b, 0) || 0
    return Math.floor(secondes / 60)
  })

  timeLastYear = computed(() => {
    const secondes = this.activitiesOfTheMonthLastYear()?.map((activity: SummaryActivity) => activity.elapsed_time || 0).reduce((a, b) => a + b, 0) || 0
    return Math.floor(secondes / 60)
  })

  activitiesDiff = computed(() => (this.activitiesOfTheMonth()?.length || 0) - (this.activitiesOfTheMonthLastYear()?.length || 0))
  nbKmDiff = computed(() => this.km() - this.kmLastYear())
  nbTimeDiff = computed(() => this.time() - this.timeLastYear())
  co2Diff = computed(() => this.co2() - this.co2LastYear())

  ngOnChanges() {
    console.log('test')
    if(this.commute()) {
      console.log(this.activitiesOfTheMonth())
    }
  }

}
