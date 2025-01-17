import { Routes } from '@angular/router';
import { YearComponent } from './pages/year/year.component';
import { MonthComponent } from './pages/month/month.component';

export const routes: Routes = [
  { path: '', component: MonthComponent },
  { path: 'year', component: YearComponent }
];
