import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core'
import { StatsService } from './services/stats.service'
import dayjs from 'dayjs'
import { MonthStatsComponent } from "./components/month-stats/month-stats.component";
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [MonthStatsComponent, HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {

  stats = inject(StatsService)

  athlete = this.stats.athlete
  activities = this.stats.activities

  firstDayOfLast12Month = Array.from({ length: 12 }, (v, index) => dayjs().startOf('month').subtract(index, 'month').format());

  constructor() {
    console.log(`
███████ ████████  █████  ████████  █████  ████████ ██████   █████  ██    ██  █████ 
██         ██    ██   ██    ██    ██   ██    ██    ██   ██ ██   ██ ██    ██ ██   ██ 
███████    ██    ███████    ██    ███████    ██    ██████  ███████ ██    ██ ███████ 
     ██    ██    ██   ██    ██    ██   ██    ██    ██   ██ ██   ██  ██  ██  ██   ██ 
███████    ██    ██   ██    ██    ██   ██    ██    ██   ██ ██   ██   ████   ██   ██ `)
  }


}
