import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateService } from '../../core/services/date.service';
import moment from 'moment';

export class DateValidators {
  constructor(private dateService: DateService) { }

  dateReleaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const dateRelease = this.dateService.parseDate(value);
      if (!this.dateService.isValidDate(dateRelease)) {
        return { invalidDate: true };
      }

      const today = this.dateService.parseDate(moment().format('DD/MM/YYYY')).startOf('day');
      return dateRelease.isBefore(today) ? { dateReleaseInvalid: true } : null;
    };
  }

  dateRevisionValidator(dateReleaseControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dateReleaseValue = dateReleaseControl.value;
      const dateRevisionValue = control.value;
      if (!dateReleaseValue || !dateRevisionValue) {
        return null;
      }

      const dateRelease = this.dateService.parseDate(dateReleaseValue);
      const dateRevision = this.dateService.parseDate(dateRevisionValue);

      if (!this.dateService.isValidDate(dateRelease) || !this.dateService.isValidDate(dateRevision)) {
        return { invalidDate: true };
      }

      const expectedDateRevision = this.dateService.addOneYear(dateRelease);
      return !dateRevision.isSame(expectedDateRevision, 'day') ? { dateRevisionInvalid: true } : null;
    };
  }
}
