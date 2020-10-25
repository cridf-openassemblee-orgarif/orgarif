import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { OrganismeService } from 'app/entities/organisme/organisme.service';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IOrganisme, Organisme } from 'app/shared/model/organisme.model';
import * as moment from 'moment';

describe('Service Tests', () => {
  describe('Organisme Service', () => {
    let injector: TestBed;
    let service: OrganismeService;
    let httpMock: HttpTestingController;
    let elemDefault: IOrganisme;
    let expectedResult: IOrganisme | IOrganisme[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(OrganismeService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Organisme(0, 'AAAAAAA', 0, 0, currentDate, currentDate, false, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            creationDate: currentDate.format(DATE_TIME_FORMAT),
            lastModificationDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Organisme', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            creationDate: currentDate.format(DATE_TIME_FORMAT),
            lastModificationDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            creationDate: currentDate,
            lastModificationDate: currentDate,
          },
          returnedFromService
        );

        service.create(new Organisme()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Organisme', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            nombreRepresentants: 1,
            nombreSuppleants: 1,
            creationDate: currentDate.format(DATE_TIME_FORMAT),
            lastModificationDate: currentDate.format(DATE_TIME_FORMAT),
            partageRepresentants: true,
            uid: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            creationDate: currentDate,
            lastModificationDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Organisme', () => {
        const returnedFromService = Object.assign(
          {
            nom: 'BBBBBB',
            nombreRepresentants: 1,
            nombreSuppleants: 1,
            creationDate: currentDate.format(DATE_TIME_FORMAT),
            lastModificationDate: currentDate.format(DATE_TIME_FORMAT),
            partageRepresentants: true,
            uid: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            creationDate: currentDate,
            lastModificationDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

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
