import { millisToMinutesAndSeconds, addCommas } from '../../helpers/helpers';

test('should return the ms to minutes', () => {
  const ms = 600000;
  const response = millisToMinutesAndSeconds(ms);
  expect(response).toBe('10:00');
});

test('should return amount with the comas', () => {
  const amount = 123456789;
  const response = addCommas(amount);
  expect(response).toBe('123,456,789');
});