import { HttpResponse } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { EluUpdateComponent } from 'app/entities/elu/elu-update.component';
import { EluService } from 'app/entities/elu/elu.service';
import { Elu } from 'app/shared/model/elu.model';
import { of } from 'rxjs';
import { OrgarifTestModule } from '../../../test.module';

describe('Component Tests', () => {
  describe('Elu Management Update Component', () => {
    let comp: EluUpdateComponent;
    let fixture: ComponentFixture<EluUpdateComponent>;
    let service: EluService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [EluUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(EluUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EluUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EluService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Elu(123);
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
        const entity = new Elu();
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
