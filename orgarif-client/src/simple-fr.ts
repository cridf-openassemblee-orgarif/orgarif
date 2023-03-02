import { LocalDate } from './domain/datetime';
import { Errors } from './errors';

export const formatLocaleDate = (value: LocalDate) => {
  const parts = value.split('-');
  if (parts.length !== 3) {
    throw Errors._41dcf9d3();
  }
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};
