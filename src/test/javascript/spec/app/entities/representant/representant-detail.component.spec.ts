import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RepresentantDetailComponent } from 'app/entities/representant/representant-detail.component';
import { Representant } from 'app/shared/model/representant.model';
import { of } from 'rxjs';
import { OrgarifTestModule } from '../../../test.module';

describe('Component Tests', () => {
  describe('Representant Management Detail Component', () => {
    let comp: RepresentantDetailComponent;
    let fixture: ComponentFixture<RepresentantDetailComponent>;
    const route = ({ data: of({ representant: new Representant(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [RepresentantDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RepresentantDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RepresentantDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load representant on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.representant).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
