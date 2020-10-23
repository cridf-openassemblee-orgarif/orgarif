import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OrgarifTestModule } from '../../../test.module';
import { DeliberationDetailComponent } from 'app/entities/deliberation/deliberation-detail.component';
import { Deliberation } from 'app/shared/model/deliberation.model';

describe('Component Tests', () => {
  describe('Deliberation Management Detail Component', () => {
    let comp: DeliberationDetailComponent;
    let fixture: ComponentFixture<DeliberationDetailComponent>;
    const route = ({ data: of({ deliberation: new Deliberation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [DeliberationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DeliberationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DeliberationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load deliberation on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.deliberation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
