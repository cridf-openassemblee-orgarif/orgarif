import { HttpResponse } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { TypeStructureUpdateComponent } from 'app/entities/type-structure/type-structure-update.component';
import { TypeStructureService } from 'app/entities/type-structure/type-structure.service';
import { TypeStructure } from 'app/shared/model/type-structure.model';
import { of } from 'rxjs';
import { OrgarifTestModule } from '../../../test.module';

describe('Component Tests', () => {
  describe('TypeStructure Management Update Component', () => {
    let comp: TypeStructureUpdateComponent;
    let fixture: ComponentFixture<TypeStructureUpdateComponent>;
    let service: TypeStructureService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [TypeStructureUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TypeStructureUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TypeStructureUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TypeStructureService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TypeStructure(123);
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
        const entity = new TypeStructure();
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
