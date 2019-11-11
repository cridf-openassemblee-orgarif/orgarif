import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OrgarifTestModule } from '../../../test.module';
import { RepresentantDeleteDialogComponent } from 'app/entities/representant/representant-delete-dialog.component';
import { RepresentantService } from 'app/entities/representant/representant.service';

describe('Component Tests', () => {
  describe('Representant Management Delete Component', () => {
    let comp: RepresentantDeleteDialogComponent;
    let fixture: ComponentFixture<RepresentantDeleteDialogComponent>;
    let service: RepresentantService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [RepresentantDeleteDialogComponent]
      })
        .overrideTemplate(RepresentantDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RepresentantDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RepresentantService);
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
