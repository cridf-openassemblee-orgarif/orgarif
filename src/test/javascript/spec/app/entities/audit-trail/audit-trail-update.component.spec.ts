import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { OrgarifTestModule } from '../../../test.module';
import { AuditTrailUpdateComponent } from 'app/entities/audit-trail/audit-trail-update.component';
import { AuditTrailService } from 'app/entities/audit-trail/audit-trail.service';
import { AuditTrail } from 'app/shared/model/audit-trail.model';

describe('Component Tests', () => {
  describe('AuditTrail Management Update Component', () => {
    let comp: AuditTrailUpdateComponent;
    let fixture: ComponentFixture<AuditTrailUpdateComponent>;
    let service: AuditTrailService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [AuditTrailUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AuditTrailUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AuditTrailUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AuditTrailService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AuditTrail(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new AuditTrail();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
