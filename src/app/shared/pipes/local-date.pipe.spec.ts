import { LocalDatePipe } from './local-date.pipe';

describe('LocalDatePipe', () => {
  let pipe: LocalDatePipe;

  beforeEach(() => {
    pipe = new LocalDatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform ISO date to dd/MM/yyyy format', () => {
    const isoDate = '2024-05-31T00:00:00.000+00:00';
    const transformedDate = pipe.transform(isoDate);
    expect(transformedDate).toBe('31/05/2024');
  });

  it('should handle date without time component', () => {
    const isoDate = '2024-05-31';
    const transformedDate = pipe.transform(isoDate);
    expect(transformedDate).toBe('31/05/2024');
  });

  it('should return empty string for empty input', () => {
    const transformedDate = pipe.transform('');
    expect(transformedDate).toBe('');
  });

  it('should return empty string for null input', () => {
    const transformedDate = pipe.transform(null as any);
    expect(transformedDate).toBe('');
  });
});
