import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OrgarifTestModule } from '../../../test.module';
import { OrganismeDeleteDialogComponent } from 'app/entities/organisme/organisme-delete-dialog.component';
import { OrganismeService } from 'app/entities/organisme/organisme.service';

describe('Component Tests', () => {
  describe('Organisme Management Delete Component', () => {
    let comp: OrganismeDeleteDialogComponent;
    let fixture: ComponentFixture<OrganismeDeleteDialogComponent>;
    let service: OrganismeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [OrganismeDeleteDialogComponent]
      })
        .overrideTemplate(OrganismeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrganismeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrganismeService);
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
