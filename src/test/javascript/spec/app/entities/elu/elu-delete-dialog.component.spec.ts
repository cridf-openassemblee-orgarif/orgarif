import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EluDeleteDialogComponent } from 'app/entities/elu/elu-delete-dialog.component';
import { EluService } from 'app/entities/elu/elu.service';
import { JhiEventManager } from 'ng-jhipster';
import { of } from 'rxjs';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { OrgarifTestModule } from '../../../test.module';

describe('Component Tests', () => {
  describe('Elu Management Delete Component', () => {
    let comp: EluDeleteDialogComponent;
    let fixture: ComponentFixture<EluDeleteDialogComponent>;
    let service: EluService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [EluDeleteDialogComponent],
      })
        .overrideTemplate(EluDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EluDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EluService);
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
