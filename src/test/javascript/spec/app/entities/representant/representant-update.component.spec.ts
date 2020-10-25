import { HttpResponse } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RepresentantUpdateComponent } from 'app/entities/representant/representant-update.component';
import { RepresentantService } from 'app/entities/representant/representant.service';
import { Representant } from 'app/shared/model/representant.model';
import { of } from 'rxjs';
import { OrgarifTestModule } from '../../../test.module';

describe('Component Tests', () => {
  describe('Representant Management Update Component', () => {
    let comp: RepresentantUpdateComponent;
    let fixture: ComponentFixture<RepresentantUpdateComponent>;
    let service: RepresentantService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [RepresentantUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RepresentantUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RepresentantUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RepresentantService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Representant(123);
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
        const entity = new Representant();
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
