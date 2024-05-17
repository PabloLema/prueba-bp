import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  parseDate(dateString: string): moment.Moment {
    return moment(dateString, 'DD/MM/YYYY');
  }

  formatDate(date: moment.Moment): string {
    return date.format('DD/MM/YYYY');
  }

  addOneYear(date: moment.Moment): moment.Moment {
    return date.clone().add(1, 'year');
  }

  isValidDate(date: moment.Moment): boolean {
    return moment.isMoment(date) && date.isValid();
  }

  transformDateToISO(dateString: string): string {
    const date = this.parseDate(dateString);
    return date.format('YYYY-MM-DD');
  }
}
