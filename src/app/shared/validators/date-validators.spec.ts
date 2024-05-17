import { FormControl } from '@angular/forms';
import moment from 'moment';
import { DateService } from '../../core/services/date.service';
import { DateValidators } from './date-validators';

describe('DateValidators', () => {
  let dateService: DateService;
  let dateValidators: DateValidators;

  beforeEach(() => {
    dateService = new DateService();
    dateValidators = new DateValidators(dateService);
  });

  describe('dateReleaseValidator', () => {
    it('should return null if the date is today or later', () => {
      const control = new FormControl(moment().format('DD/MM/YYYY'));
      const validator = dateValidators.dateReleaseValidator();
      expect(validator(control)).toBeNull();

      const controlFuture = new FormControl(moment().add(1, 'day').format('DD/MM/YYYY'));
      expect(validator(controlFuture)).toBeNull();
    });

    it('should return an error if the date is before today', () => {
      const control = new FormControl(moment().subtract(1, 'day').format('DD/MM/YYYY'));
      const validator = dateValidators.dateReleaseValidator();
      expect(validator(control)).toEqual({ dateReleaseInvalid: true });
    });

    it('should return an error if the date is invalid', () => {
      const control = new FormControl('invalid-date');
      const validator = dateValidators.dateReleaseValidator();
      expect(validator(control)).toEqual({ invalidDate: true });
    });
  });

  describe('dateRevisionValidator', () => {
    it('should return null if the date_revision is exactly one year after date_release', () => {
      const dateReleaseControl = new FormControl(moment().format('DD/MM/YYYY'));
      const control = new FormControl(moment().add(1, 'year').format('DD/MM/YYYY'));
      const validator = dateValidators.dateRevisionValidator(dateReleaseControl);
      expect(validator(control)).toBeNull();
    });

    it('should return an error if the date_revision is not exactly one year after date_release', () => {
      const dateReleaseControl = new FormControl(moment().format('DD/MM/YYYY'));
      const control = new FormControl(moment().add(1, 'year').subtract(1, 'day').format('DD/MM/YYYY'));
      const validator = dateValidators.dateRevisionValidator(dateReleaseControl);
      expect(validator(control)).toEqual({ dateRevisionInvalid: true });

      const controlFuture = new FormControl(moment().add(1, 'year').add(1, 'day').format('DD/MM/YYYY'));
      expect(validator(controlFuture)).toEqual({ dateRevisionInvalid: true });
    });

    it('should return an error if the date_release or date_revision is invalid', () => {
      const dateReleaseControl = new FormControl('invalid-date');
      const control = new FormControl(moment().add(1, 'year').format('DD/MM/YYYY'));
      const validator = dateValidators.dateRevisionValidator(dateReleaseControl);
      expect(validator(control)).toEqual({ invalidDate: true });

      const validDateReleaseControl = new FormControl(moment().format('DD/MM/YYYY'));
      const invalidDateRevisionControl = new FormControl('invalid-date');
      const validDateValidator = dateValidators.dateRevisionValidator(validDateReleaseControl);
      expect(validDateValidator(invalidDateRevisionControl)).toEqual({ invalidDate: true });
    });
  });
});
