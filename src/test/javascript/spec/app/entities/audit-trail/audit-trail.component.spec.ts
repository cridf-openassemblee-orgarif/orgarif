import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OrgarifTestModule } from '../../../test.module';
import { AuditTrailComponent } from 'app/entities/audit-trail/audit-trail.component';
import { AuditTrailService } from 'app/entities/audit-trail/audit-trail.service';
import { AuditTrail } from 'app/shared/model/audit-trail.model';

describe('Component Tests', () => {
  describe('AuditTrail Management Component', () => {
    let comp: AuditTrailComponent;
    let fixture: ComponentFixture<AuditTrailComponent>;
    let service: AuditTrailService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [AuditTrailComponent],
      })
        .overrideTemplate(AuditTrailComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AuditTrailComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AuditTrailService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AuditTrail(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.auditTrails && comp.auditTrails[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
