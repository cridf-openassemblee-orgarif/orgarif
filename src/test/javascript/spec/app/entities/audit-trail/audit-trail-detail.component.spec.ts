import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OrgarifTestModule } from '../../../test.module';
import { AuditTrailDetailComponent } from 'app/entities/audit-trail/audit-trail-detail.component';
import { AuditTrail } from 'app/shared/model/audit-trail.model';

describe('Component Tests', () => {
  describe('AuditTrail Management Detail Component', () => {
    let comp: AuditTrailDetailComponent;
    let fixture: ComponentFixture<AuditTrailDetailComponent>;
    const route = ({ data: of({ auditTrail: new AuditTrail(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [AuditTrailDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AuditTrailDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AuditTrailDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load auditTrail on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.auditTrail).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
