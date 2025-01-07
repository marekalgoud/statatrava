import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (!value && value !== 0) return '';

    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    const formattedHours = hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${formattedHours} ${hours > 1 ? `heures`:`heure`} ${minutes > 0 ? `et ${formattedMinutes} ${minutes > 1 ? `minutes`: `minute`}` : ``}`;
  }

}
