import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localDate',
  standalone: true
})
export class LocalDatePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const [year, month, day] = value.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  }
}
