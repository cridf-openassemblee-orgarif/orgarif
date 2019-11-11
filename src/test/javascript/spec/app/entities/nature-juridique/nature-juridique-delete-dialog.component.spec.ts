import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { OrgarifTestModule } from '../../../test.module';
import { NatureJuridiqueDeleteDialogComponent } from 'app/entities/nature-juridique/nature-juridique-delete-dialog.component';
import { NatureJuridiqueService } from 'app/entities/nature-juridique/nature-juridique.service';

describe('Component Tests', () => {
  describe('NatureJuridique Management Delete Component', () => {
    let comp: NatureJuridiqueDeleteDialogComponent;
    let fixture: ComponentFixture<NatureJuridiqueDeleteDialogComponent>;
    let service: NatureJuridiqueService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [NatureJuridiqueDeleteDialogComponent]
      })
        .overrideTemplate(NatureJuridiqueDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NatureJuridiqueDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NatureJuridiqueService);
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
