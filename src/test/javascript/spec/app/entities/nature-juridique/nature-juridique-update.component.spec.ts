import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { OrgarifTestModule } from '../../../test.module';
import { NatureJuridiqueUpdateComponent } from 'app/entities/nature-juridique/nature-juridique-update.component';
import { NatureJuridiqueService } from 'app/entities/nature-juridique/nature-juridique.service';
import { NatureJuridique } from 'app/shared/model/nature-juridique.model';

describe('Component Tests', () => {
  describe('NatureJuridique Management Update Component', () => {
    let comp: NatureJuridiqueUpdateComponent;
    let fixture: ComponentFixture<NatureJuridiqueUpdateComponent>;
    let service: NatureJuridiqueService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [NatureJuridiqueUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(NatureJuridiqueUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NatureJuridiqueUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NatureJuridiqueService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NatureJuridique(123);
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
        const entity = new NatureJuridique();
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
