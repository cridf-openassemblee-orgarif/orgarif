import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OrgarifTestModule } from '../../../test.module';
import { SecteurDeleteDialogComponent } from 'app/entities/secteur/secteur-delete-dialog.component';
import { SecteurService } from 'app/entities/secteur/secteur.service';

describe('Component Tests', () => {
  describe('Secteur Management Delete Component', () => {
    let comp: SecteurDeleteDialogComponent;
    let fixture: ComponentFixture<SecteurDeleteDialogComponent>;
    let service: SecteurService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [SecteurDeleteDialogComponent]
      })
        .overrideTemplate(SecteurDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SecteurDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SecteurService);
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
