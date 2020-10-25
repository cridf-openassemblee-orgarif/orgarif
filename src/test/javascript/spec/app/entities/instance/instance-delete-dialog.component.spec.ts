import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InstanceDeleteDialogComponent } from 'app/entities/instance/instance-delete-dialog.component';
import { InstanceService } from 'app/entities/instance/instance.service';
import { JhiEventManager } from 'ng-jhipster';
import { of } from 'rxjs';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { OrgarifTestModule } from '../../../test.module';

describe('Component Tests', () => {
  describe('Instance Management Delete Component', () => {
    let comp: InstanceDeleteDialogComponent;
    let fixture: ComponentFixture<InstanceDeleteDialogComponent>;
    let service: InstanceService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [InstanceDeleteDialogComponent],
      })
        .overrideTemplate(InstanceDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InstanceDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InstanceService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
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
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
