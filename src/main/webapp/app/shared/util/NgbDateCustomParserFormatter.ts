import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}

function isNumber(value: any): boolean {
  return !isNaN(toInteger(value));
}

function padNumber(value: number): string {
  if (isNumber(value)) {
    return `0${value}`.slice(-2);
  } else {
    return '';
  }
}

// thanks https://stackoverflow.com/questions/40664523/angular2-ngbdatepicker-how-to-format-date-in-inputfield
@Injectable()
export class NgbDateFRParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct | null {
    if (value) {
      const dateParts = value.trim().split('/');
      if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
        return { year: toInteger(dateParts[2]), month: toInteger(dateParts[1]), day: toInteger(dateParts[0]) };
      }
    }
    return null;
  }

  format(date: NgbDateStruct): string {
    let stringDate = '';
    if (date) {
      stringDate += isNumber(date.day) ? padNumber(date.day) + '/' : '';
      stringDate += isNumber(date.month) ? padNumber(date.month) + '/' : '';
      stringDate += date.year;
    }
    return stringDate;
  }
}
