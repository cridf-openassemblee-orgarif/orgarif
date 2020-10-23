import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OrgarifTestModule } from '../../../test.module';
import { EluDetailComponent } from 'app/entities/elu/elu-detail.component';
import { Elu } from 'app/shared/model/elu.model';

describe('Component Tests', () => {
  describe('Elu Management Detail Component', () => {
    let comp: EluDetailComponent;
    let fixture: ComponentFixture<EluDetailComponent>;
    const route = ({ data: of({ elu: new Elu(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [EluDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EluDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EluDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load elu on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.elu).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
