import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { OrgarifTestModule } from '../../../test.module';
import { OrganismeUpdateComponent } from 'app/entities/organisme/organisme-update.component';
import { OrganismeService } from 'app/entities/organisme/organisme.service';
import { Organisme } from 'app/shared/model/organisme.model';

describe('Component Tests', () => {
  describe('Organisme Management Update Component', () => {
    let comp: OrganismeUpdateComponent;
    let fixture: ComponentFixture<OrganismeUpdateComponent>;
    let service: OrganismeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [OrganismeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(OrganismeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrganismeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrganismeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Organisme(123);
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
        const entity = new Organisme();
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
