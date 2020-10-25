import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeStructureComponent } from 'app/entities/type-structure/type-structure.component';
import { TypeStructureService } from 'app/entities/type-structure/type-structure.service';
import { TypeStructure } from 'app/shared/model/type-structure.model';
import { of } from 'rxjs';
import { OrgarifTestModule } from '../../../test.module';

describe('Component Tests', () => {
  describe('TypeStructure Management Component', () => {
    let comp: TypeStructureComponent;
    let fixture: ComponentFixture<TypeStructureComponent>;
    let service: TypeStructureService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [TypeStructureComponent],
      })
        .overrideTemplate(TypeStructureComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TypeStructureComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TypeStructureService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TypeStructure(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.typeStructures && comp.typeStructures[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
