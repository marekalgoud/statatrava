import { Component, inject } from '@angular/core'
import { StatsService } from './services/stats.service'
import {RouterOutlet} from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, RouterOutlet],
})
export class AppComponent {

  stats = inject(StatsService)
  athlete = this.stats.athlete

  constructor() {
    console.log(`
███████ ████████  █████  ████████  █████  ████████ ██████   █████  ██    ██  █████ 
██         ██    ██   ██    ██    ██   ██    ██    ██   ██ ██   ██ ██    ██ ██   ██ 
███████    ██    ███████    ██    ███████    ██    ██████  ███████ ██    ██ ███████ 
     ██    ██    ██   ██    ██    ██   ██    ██    ██   ██ ██   ██  ██  ██  ██   ██ 
███████    ██    ██   ██    ██    ██   ██    ██    ██   ██ ██   ██   ████   ██   ██ `)
  }


}
