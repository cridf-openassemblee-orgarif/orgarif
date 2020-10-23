import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OrgarifTestModule } from '../../../test.module';
import { SecteurDetailComponent } from 'app/entities/secteur/secteur-detail.component';
import { Secteur } from 'app/shared/model/secteur.model';

describe('Component Tests', () => {
  describe('Secteur Management Detail Component', () => {
    let comp: SecteurDetailComponent;
    let fixture: ComponentFixture<SecteurDetailComponent>;
    const route = ({ data: of({ secteur: new Secteur(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [SecteurDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SecteurDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SecteurDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load secteur on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.secteur).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
