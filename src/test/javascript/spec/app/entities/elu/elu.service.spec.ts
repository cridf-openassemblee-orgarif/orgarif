import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { EluService } from 'app/entities/elu/elu.service';
import { Elu, IElu } from 'app/shared/model/elu.model';
import { Civilite } from 'app/shared/model/enumerations/civilite.model';

describe('Service Tests', () => {
  describe('Elu Service', () => {
    let injector: TestBed;
    let service: EluService;
    let httpMock: HttpTestingController;
    let elemDefault: IElu;
    let expectedResult: IElu | IElu[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EluService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Elu(0, 'AAAAAAA', 'AAAAAAA', Civilite.M, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Elu', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Elu()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Elu', () => {
        const returnedFromService = Object.assign(
          {
            sourceId: 'BBBBBB',
            sourceUid: 'BBBBBB',
            civilite: 'BBBBBB',
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            groupePolitique: 'BBBBBB',
            groupePolitiqueCourt: 'BBBBBB',
            image: 'BBBBBB',
            actif: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Elu', () => {
        const returnedFromService = Object.assign(
          {
            sourceId: 'BBBBBB',
            sourceUid: 'BBBBBB',
            civilite: 'BBBBBB',
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            groupePolitique: 'BBBBBB',
            groupePolitiqueCourt: 'BBBBBB',
            image: 'BBBBBB',
            actif: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Elu', () => {
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
