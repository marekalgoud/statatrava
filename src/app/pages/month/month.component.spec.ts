import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthComponent } from './month.component';
import { provideHttpClient } from '@angular/common/http';
import { StatsService } from '../../services/stats.service';

describe('MonthComponent', () => {
  let component: MonthComponent;
  let fixture: ComponentFixture<MonthComponent>;

  beforeEach(async () => {
    const mockStatsService = jasmine.createSpyObj('mockStatsService', ['activities', 'athlete'] )

    await TestBed.configureTestingModule({
      imports: [MonthComponent],
      providers: [
        provideHttpClient(),
        { provide: StatsService, useValue: mockStatsService}
      ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
