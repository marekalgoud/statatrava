import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import dayjs from 'dayjs';
import packageJson from '../../../../package.json';

@Component({
  selector: 'app-footer',
  imports: [DatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  date = signal(dayjs().toDate());

  version = packageJson.version;
}
