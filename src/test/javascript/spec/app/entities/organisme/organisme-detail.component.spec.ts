import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { OrganismeDetailComponent } from 'app/entities/organisme/organisme-detail.component';
import { Organisme } from 'app/shared/model/organisme.model';
import { of } from 'rxjs';
import { OrgarifTestModule } from '../../../test.module';

describe('Component Tests', () => {
  describe('Organisme Management Detail Component', () => {
    let comp: OrganismeDetailComponent;
    let fixture: ComponentFixture<OrganismeDetailComponent>;
    const route = ({ data: of({ organisme: new Organisme(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [OrganismeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(OrganismeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrganismeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load organisme on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.organisme).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
