import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TypeStructureDetailComponent } from 'app/entities/type-structure/type-structure-detail.component';
import { TypeStructure } from 'app/shared/model/type-structure.model';
import { of } from 'rxjs';
import { OrgarifTestModule } from '../../../test.module';

describe('Component Tests', () => {
  describe('TypeStructure Management Detail Component', () => {
    let comp: TypeStructureDetailComponent;
    let fixture: ComponentFixture<TypeStructureDetailComponent>;
    const route = ({ data: of({ typeStructure: new TypeStructure(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [TypeStructureDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TypeStructureDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TypeStructureDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load typeStructure on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.typeStructure).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
