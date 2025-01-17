import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearStatsComponent } from './year-stats.component';
import { AthletesService } from '../../open-api/strava';
import { StatsService } from '../../services/stats.service';
import { provideHttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';

@Component({
  imports: [YearStatsComponent],
  template: `<app-year-stats [day]="day()" [activities]="activities()" [types]="['Run', 'TrailRun']"></app-year-stats>`
})
export class MonthStatsTestComponent {
  day = signal('2020-04-02T08:02:17-05:00')
  activities = signal([])
}

describe('MonthStatsComponent', () => {
  let component: MonthStatsTestComponent;
  let fixture: ComponentFixture<MonthStatsTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthStatsTestComponent],
      providers: [
        StatsService,
        AthletesService,
        provideHttpClient()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthStatsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


