import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { StatsService } from './services/stats.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {

  const mockStatsService = jasmine.createSpyObj('mockStatsService', ['activities', 'athlete'] )
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        { provide: StatsService, useValue: mockStatsService},
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // Mock des paramètres de route si nécessaire
            snapshot: {
              paramMap: {
                get: () => '123' // Mock des paramètres de route si nécessaire
              }
            }
          }
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('StataTrava');
  });
});
