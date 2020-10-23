import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OrgarifTestModule } from '../../../test.module';
import { SecteurComponent } from 'app/entities/secteur/secteur.component';
import { SecteurService } from 'app/entities/secteur/secteur.service';
import { Secteur } from 'app/shared/model/secteur.model';

describe('Component Tests', () => {
  describe('Secteur Management Component', () => {
    let comp: SecteurComponent;
    let fixture: ComponentFixture<SecteurComponent>;
    let service: SecteurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [SecteurComponent],
      })
        .overrideTemplate(SecteurComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SecteurComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SecteurService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Secteur(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.secteurs && comp.secteurs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
