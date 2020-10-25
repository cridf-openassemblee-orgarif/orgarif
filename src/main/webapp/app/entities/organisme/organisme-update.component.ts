import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DeliberationService } from 'app/entities/deliberation/deliberation.service';
import { NatureJuridiqueService } from 'app/entities/nature-juridique/nature-juridique.service';
import { SecteurService } from 'app/entities/secteur/secteur.service';
import { TypeStructureService } from 'app/entities/type-structure/type-structure.service';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IDeliberation } from 'app/shared/model/deliberation.model';
import { INatureJuridique } from 'app/shared/model/nature-juridique.model';
import { IOrganisme, Organisme } from 'app/shared/model/organisme.model';
import { ISecteur } from 'app/shared/model/secteur.model';
import { ITypeStructure } from 'app/shared/model/type-structure.model';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { OrganismeService } from './organisme.service';

type SelectableEntity = INatureJuridique | ISecteur | ITypeStructure | IDeliberation;

@Component({
  selector: 'jhi-organisme-update',
  templateUrl: './organisme-update.component.html',
})
export class OrganismeUpdateComponent implements OnInit {
  isSaving = false;
  naturejuridiques: INatureJuridique[] = [];
  secteurs: ISecteur[] = [];
  typestructures: ITypeStructure[] = [];
  deliberations: IDeliberation[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    nombreRepresentants: [null, [Validators.required]],
    nombreSuppleants: [null, [Validators.required]],
    creationDate: [],
    lastModificationDate: [],
    partageRepresentants: [],
    uid: [null, []],
    natureJuridique: [null, Validators.required],
    secteur: [null, Validators.required],
    typeStructure: [],
    deliberations: [],
  });

  constructor(
    protected organismeService: OrganismeService,
    protected natureJuridiqueService: NatureJuridiqueService,
    protected secteurService: SecteurService,
    protected typeStructureService: TypeStructureService,
    protected deliberationService: DeliberationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ organisme }) => {
      if (!organisme.id) {
        const today = moment().startOf('day');
        organisme.creationDate = today;
        organisme.lastModificationDate = today;
      }

      this.updateForm(organisme);

      this.natureJuridiqueService.query().subscribe((res: HttpResponse<INatureJuridique[]>) => (this.naturejuridiques = res.body || []));

      this.secteurService.query().subscribe((res: HttpResponse<ISecteur[]>) => (this.secteurs = res.body || []));

      this.typeStructureService.query().subscribe((res: HttpResponse<ITypeStructure[]>) => (this.typestructures = res.body || []));

      this.deliberationService.query().subscribe((res: HttpResponse<IDeliberation[]>) => (this.deliberations = res.body || []));
    });
  }

  updateForm(organisme: IOrganisme): void {
    this.editForm.patchValue({
      id: organisme.id,
      nom: organisme.nom,
      nombreRepresentants: organisme.nombreRepresentants,
      nombreSuppleants: organisme.nombreSuppleants,
      creationDate: organisme.creationDate ? organisme.creationDate.format(DATE_TIME_FORMAT) : null,
      lastModificationDate: organisme.lastModificationDate ? organisme.lastModificationDate.format(DATE_TIME_FORMAT) : null,
      partageRepresentants: organisme.partageRepresentants,
      uid: organisme.uid,
      natureJuridique: organisme.natureJuridique,
      secteur: organisme.secteur,
      typeStructure: organisme.typeStructure,
      deliberations: organisme.deliberations,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const organisme = this.createFromForm();
    if (organisme.id !== undefined) {
      this.subscribeToSaveResponse(this.organismeService.update(organisme));
    } else {
      this.subscribeToSaveResponse(this.organismeService.create(organisme));
    }
  }

  private createFromForm(): IOrganisme {
    return {
      ...new Organisme(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      nombreRepresentants: this.editForm.get(['nombreRepresentants'])!.value,
      nombreSuppleants: this.editForm.get(['nombreSuppleants'])!.value,
      creationDate: this.editForm.get(['creationDate'])!.value
        ? moment(this.editForm.get(['creationDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      lastModificationDate: this.editForm.get(['lastModificationDate'])!.value
        ? moment(this.editForm.get(['lastModificationDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      partageRepresentants: this.editForm.get(['partageRepresentants'])!.value,
      uid: this.editForm.get(['uid'])!.value,
      natureJuridique: this.editForm.get(['natureJuridique'])!.value,
      secteur: this.editForm.get(['secteur'])!.value,
      typeStructure: this.editForm.get(['typeStructure'])!.value,
      deliberations: this.editForm.get(['deliberations'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrganisme>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IDeliberation[], option: IDeliberation): IDeliberation {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
