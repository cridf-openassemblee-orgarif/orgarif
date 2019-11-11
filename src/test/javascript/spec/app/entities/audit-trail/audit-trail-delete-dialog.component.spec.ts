import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OrgarifTestModule } from '../../../test.module';
import { AuditTrailDeleteDialogComponent } from 'app/entities/audit-trail/audit-trail-delete-dialog.component';
import { AuditTrailService } from 'app/entities/audit-trail/audit-trail.service';

describe('Component Tests', () => {
  describe('AuditTrail Management Delete Component', () => {
    let comp: AuditTrailDeleteDialogComponent;
    let fixture: ComponentFixture<AuditTrailDeleteDialogComponent>;
    let service: AuditTrailService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [AuditTrailDeleteDialogComponent]
      })
        .overrideTemplate(AuditTrailDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AuditTrailDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AuditTrailService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
