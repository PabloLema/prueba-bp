import { TestBed } from '@angular/core/testing';
import moment from 'moment';
import { DateService } from './date.service';

describe('DateService', () => {
  let service: DateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse a date string to a moment object', () => {
    const dateString = '16/05/2024';
    const date = service.parseDate(dateString);
    expect(date.isValid()).toBeTrue();
    expect(date.format('DD/MM/YYYY')).toBe(dateString);
  });

  it('should format a moment object to a date string', () => {
    const date = moment('2024-05-16');
    const formattedDate = service.formatDate(date);
    expect(formattedDate).toBe('16/05/2024');
  });

  it('should add one year to a given date', () => {
    const date = moment('2024-05-16');
    const newDate = service.addOneYear(date);
    expect(newDate.format('DD/MM/YYYY')).toBe('16/05/2025');
  });

  it('should return true for a valid moment date', () => {
    const date = moment('2024-05-16');
    expect(service.isValidDate(date)).toBeTrue();
  });

  it('should return false for an invalid moment date', () => {
    const date = moment('invalid date');
    expect(service.isValidDate(date)).toBeFalse();
  });

  it('should transform a date string from DD/MM/YYYY to YYYY-MM-DD', () => {
    const dateString = '17/05/2024';
    const transformedDate = service.transformDateToISO(dateString);
    expect(transformedDate).toBe('2024-05-17');
  });
});
