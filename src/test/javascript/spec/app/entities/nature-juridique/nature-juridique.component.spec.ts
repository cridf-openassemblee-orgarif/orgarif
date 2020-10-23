import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OrgarifTestModule } from '../../../test.module';
import { NatureJuridiqueComponent } from 'app/entities/nature-juridique/nature-juridique.component';
import { NatureJuridiqueService } from 'app/entities/nature-juridique/nature-juridique.service';
import { NatureJuridique } from 'app/shared/model/nature-juridique.model';

describe('Component Tests', () => {
  describe('NatureJuridique Management Component', () => {
    let comp: NatureJuridiqueComponent;
    let fixture: ComponentFixture<NatureJuridiqueComponent>;
    let service: NatureJuridiqueService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [NatureJuridiqueComponent],
      })
        .overrideTemplate(NatureJuridiqueComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NatureJuridiqueComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NatureJuridiqueService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NatureJuridique(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.natureJuridiques && comp.natureJuridiques[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
