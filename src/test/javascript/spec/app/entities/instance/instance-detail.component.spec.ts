import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { InstanceDetailComponent } from 'app/entities/instance/instance-detail.component';
import { Instance } from 'app/shared/model/instance.model';
import { of } from 'rxjs';
import { OrgarifTestModule } from '../../../test.module';

describe('Component Tests', () => {
  describe('Instance Management Detail Component', () => {
    let comp: InstanceDetailComponent;
    let fixture: ComponentFixture<InstanceDetailComponent>;
    const route = ({ data: of({ instance: new Instance(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [OrgarifTestModule],
        declarations: [InstanceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(InstanceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InstanceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load instance on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.instance).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
