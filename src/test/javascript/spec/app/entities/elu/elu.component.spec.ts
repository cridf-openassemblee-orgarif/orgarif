import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OrgarifTestModule } from '../../../test.module';
import { EluComponent } from 'app/entities/elu/elu.component';
import { EluService } from 'app/entities/elu/elu.service';
import { Elu } from 'app/shared/model/elu.model';

describe('Component Tests', () => {
  describe('Elu Management Component', () => {
    let comp: EluComponent;
    let fixture: ComponentFixture<EluComponent>;
    let service: EluService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [EluComponent],
        providers: []
      })
        .overrideTemplate(EluComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EluComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EluService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Elu(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.elus[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
