import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import dayjs from 'dayjs';
import { StatsService } from '../../services/stats.service';
import { YearStatsComponent } from '../../components/year-stats/year-stats.component';

@Component({
  selector: 'app-year',
  imports: [YearStatsComponent],
  templateUrl: './year.component.html',
  styleUrl: './year.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YearComponent {

  stats = inject(StatsService)

    activities = this.stats.activities

    firstDayOfYear = computed(() => {
      const firstActivity = this.activities()?.pop()
      let firstActivityDate = dayjs(firstActivity?.start_date).startOf('year')
      const res = [firstActivityDate.format()]
      while(firstActivityDate.isBefore(dayjs().startOf('year'))) {
        firstActivityDate = firstActivityDate.add(1, 'year')
        res.push(firstActivityDate.format())
      }
      return res.reverse()
    })

}
