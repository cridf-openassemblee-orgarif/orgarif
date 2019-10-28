import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { OrganismeService } from 'app/entities/organisme/organisme.service';
import { IOrganisme, Organisme } from 'app/shared/model/organisme.model';

describe('Service Tests', () => {
  describe('Organisme Service', () => {
    let injector: TestBed;
    let service: OrganismeService;
    let httpMock: HttpTestingController;
    let elemDefault: IOrganisme;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(OrganismeService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Organisme(0, 'AAAAAAA', 0, 0, currentDate, currentDate, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            creationDate: currentDate.format(DATE_TIME_FORMAT),
            lastModificationDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Organisme', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            creationDate: currentDate.format(DATE_TIME_FORMAT),
            lastModificationDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            creationDate: currentDate,
            lastModificationDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new Organisme(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Organisme', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            nombreRepresentants: 1,
            nombreSuppleants: 1,
            creationDate: currentDate.format(DATE_TIME_FORMAT),
            lastModificationDate: currentDate.format(DATE_TIME_FORMAT),
            partageRepresentants: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            creationDate: currentDate,
            lastModificationDate: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Organisme', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            nombreRepresentants: 1,
            nombreSuppleants: 1,
            creationDate: currentDate.format(DATE_TIME_FORMAT),
            lastModificationDate: currentDate.format(DATE_TIME_FORMAT),
            partageRepresentants: true
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            creationDate: currentDate,
            lastModificationDate: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Organisme', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
