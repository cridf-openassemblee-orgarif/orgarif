import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OrgarifTestModule } from '../../../test.module';
import { DeliberationDeleteDialogComponent } from 'app/entities/deliberation/deliberation-delete-dialog.component';
import { DeliberationService } from 'app/entities/deliberation/deliberation.service';

describe('Component Tests', () => {
  describe('Deliberation Management Delete Component', () => {
    let comp: DeliberationDeleteDialogComponent;
    let fixture: ComponentFixture<DeliberationDeleteDialogComponent>;
    let service: DeliberationService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [DeliberationDeleteDialogComponent]
      })
        .overrideTemplate(DeliberationDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DeliberationDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DeliberationService);
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
