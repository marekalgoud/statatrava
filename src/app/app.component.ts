import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core'
import { StatsService } from './services/stats.service'
import dayjs from 'dayjs'
import { MonthStatsComponent } from "./components/month-stats/month-stats.component";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [MonthStatsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {

  stats = inject(StatsService);
  document = inject(DOCUMENT);

  athlete = this.stats.athlete;
  activities = this.stats.getActivities()

  firstDayOfLast12Month = Array.from({ length: 12 }, (v, index) => dayjs().startOf('month').subtract(index, 'month').format());

  constructor() {
    console.log(`
███████ ████████  █████  ████████  █████  ████████ ██████   █████  ██    ██  █████ 
██         ██    ██   ██    ██    ██   ██    ██    ██   ██ ██   ██ ██    ██ ██   ██ 
███████    ██    ███████    ██    ███████    ██    ██████  ███████ ██    ██ ███████ 
     ██    ██    ██   ██    ██    ██   ██    ██    ██   ██ ██   ██  ██  ██  ██   ██ 
███████    ██    ██   ██    ██    ██   ██    ██    ██   ██ ██   ██   ████   ██   ██ `)
  }
  toggle() {
    const element = this.document.querySelector('html');
    if (element) {
      element.classList.toggle('dark');
    }
  }

}
