import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NatureJuridiqueDetailComponent } from 'app/entities/nature-juridique/nature-juridique-detail.component';
import { NatureJuridique } from 'app/shared/model/nature-juridique.model';
import { of } from 'rxjs';
import { OrgarifTestModule } from '../../../test.module';

describe('Component Tests', () => {
  describe('NatureJuridique Management Detail Component', () => {
    let comp: NatureJuridiqueDetailComponent;
    let fixture: ComponentFixture<NatureJuridiqueDetailComponent>;
    const route = ({ data: of({ natureJuridique: new NatureJuridique(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [NatureJuridiqueDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NatureJuridiqueDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NatureJuridiqueDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load natureJuridique on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.natureJuridique).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
