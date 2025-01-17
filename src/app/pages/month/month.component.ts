import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { MonthStatsComponent } from '../../components/month-stats/month-stats.component';
import { StatsService } from '../../services/stats.service';
import dayjs from 'dayjs';

@Component({
  selector: 'app-month',
  imports: [MonthStatsComponent],
  templateUrl: './month.component.html',
  styleUrl: './month.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MonthComponent {
  stats = inject(StatsService)

  activities = this.stats.activities

  firstDayOfLast12Month = signal(Array.from({ length: 12 }, (v, index) => dayjs().startOf('month').subtract(index, 'month').format()));

}
