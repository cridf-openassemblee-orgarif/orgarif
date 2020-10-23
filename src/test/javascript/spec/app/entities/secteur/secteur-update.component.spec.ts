import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { OrgarifTestModule } from '../../../test.module';
import { SecteurUpdateComponent } from 'app/entities/secteur/secteur-update.component';
import { SecteurService } from 'app/entities/secteur/secteur.service';
import { Secteur } from 'app/shared/model/secteur.model';

describe('Component Tests', () => {
  describe('Secteur Management Update Component', () => {
    let comp: SecteurUpdateComponent;
    let fixture: ComponentFixture<SecteurUpdateComponent>;
    let service: SecteurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [SecteurUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SecteurUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SecteurUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SecteurService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Secteur(123);
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
        const entity = new Secteur();
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
