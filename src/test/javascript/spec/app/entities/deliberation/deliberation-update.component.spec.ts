import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { OrgarifTestModule } from '../../../test.module';
import { DeliberationUpdateComponent } from 'app/entities/deliberation/deliberation-update.component';
import { DeliberationService } from 'app/entities/deliberation/deliberation.service';
import { Deliberation } from 'app/shared/model/deliberation.model';

describe('Component Tests', () => {
  describe('Deliberation Management Update Component', () => {
    let comp: DeliberationUpdateComponent;
    let fixture: ComponentFixture<DeliberationUpdateComponent>;
    let service: DeliberationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [DeliberationUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DeliberationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DeliberationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DeliberationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Deliberation(123);
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
        const entity = new Deliberation();
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
