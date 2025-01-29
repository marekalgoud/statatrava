import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import dayjs from 'dayjs';
import { StatsService } from '../../services/stats.service';
import { YearStatsComponent } from '../../components/year-stats/year-stats.component';
import { LoadingComponent } from "../../components/loading/loading.component";

@Component({
  selector: 'app-year',
  imports: [YearStatsComponent, LoadingComponent],
  templateUrl: './year.component.html',
  styleUrl: './year.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YearComponent {

  stats = inject(StatsService)

  activities = this.stats.activities

  firstDayOfYear = computed(() => {
    const activities = this.activities()
    if(activities && activities.length > 0) {
      const firstActivity = activities[activities.length - 1]
      let firstActivityDate = dayjs(firstActivity?.start_date).startOf('year')
      const res = [firstActivityDate.format()]
      while (firstActivityDate.isBefore(dayjs().startOf('year'))) {
        firstActivityDate = firstActivityDate.add(1, 'year')
        res.push(firstActivityDate.format())
      }
      return res.reverse()
    }
    return []
  })

}
