import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearComponent } from './year.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { StatsService } from '../../services/stats.service';

describe('YearComponent', () => {
  let component: YearComponent;
  let fixture: ComponentFixture<YearComponent>;

  beforeEach(async () => {
    const mockStatsService = jasmine.createSpyObj('mockStatsService', ['activities', 'athlete'] )

    await TestBed.configureTestingModule({
      imports: [YearComponent],
      providers: [
        provideHttpClient(),
        { provide: StatsService, useValue: mockStatsService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
