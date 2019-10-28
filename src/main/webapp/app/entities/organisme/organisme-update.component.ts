import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IOrganisme, Organisme } from 'app/shared/model/organisme.model';
import { OrganismeService } from './organisme.service';
import { INatureJuridique } from 'app/shared/model/nature-juridique.model';
import { NatureJuridiqueService } from 'app/entities/nature-juridique/nature-juridique.service';
import { ISecteur } from 'app/shared/model/secteur.model';
import { SecteurService } from 'app/entities/secteur/secteur.service';
import { ITypeStructure } from 'app/shared/model/type-structure.model';
import { TypeStructureService } from 'app/entities/type-structure/type-structure.service';
import { IDeliberation } from 'app/shared/model/deliberation.model';
import { DeliberationService } from 'app/entities/deliberation/deliberation.service';

@Component({
  selector: 'jhi-organisme-update',
  templateUrl: './organisme-update.component.html'
})
export class OrganismeUpdateComponent implements OnInit {
  isSaving: boolean;

  naturejuridiques: INatureJuridique[];

  secteurs: ISecteur[];

  typestructures: ITypeStructure[];

  deliberations: IDeliberation[];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    nombreRepresentants: [null, [Validators.required]],
    nombreSuppleants: [null, [Validators.required]],
    creationDate: [],
    lastModificationDate: [],
    partageRepresentants: [],
    natureJuridique: [null, Validators.required],
    secteur: [null, Validators.required],
    typeStructure: [],
    deliberations: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected organismeService: OrganismeService,
    protected natureJuridiqueService: NatureJuridiqueService,
    protected secteurService: SecteurService,
    protected typeStructureService: TypeStructureService,
    protected deliberationService: DeliberationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ organisme }) => {
      this.updateForm(organisme);
    });
    this.natureJuridiqueService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<INatureJuridique[]>) => mayBeOk.ok),
        map((response: HttpResponse<INatureJuridique[]>) => response.body)
      )
      .subscribe((res: INatureJuridique[]) => (this.naturejuridiques = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.secteurService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISecteur[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISecteur[]>) => response.body)
      )
      .subscribe((res: ISecteur[]) => (this.secteurs = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.typeStructureService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITypeStructure[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITypeStructure[]>) => response.body)
      )
      .subscribe((res: ITypeStructure[]) => (this.typestructures = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.deliberationService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDeliberation[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDeliberation[]>) => response.body)
      )
      .subscribe((res: IDeliberation[]) => (this.deliberations = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(organisme: IOrganisme) {
    this.editForm.patchValue({
      id: organisme.id,
      nom: organisme.nom,
      nombreRepresentants: organisme.nombreRepresentants,
      nombreSuppleants: organisme.nombreSuppleants,
      creationDate: organisme.creationDate != null ? organisme.creationDate.format(DATE_TIME_FORMAT) : null,
      lastModificationDate: organisme.lastModificationDate != null ? organisme.lastModificationDate.format(DATE_TIME_FORMAT) : null,
      partageRepresentants: organisme.partageRepresentants,
      natureJuridique: organisme.natureJuridique,
      secteur: organisme.secteur,
      typeStructure: organisme.typeStructure,
      deliberations: organisme.deliberations
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
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
      id: this.editForm.get(['id']).value,
      nom: this.editForm.get(['nom']).value,
      nombreRepresentants: this.editForm.get(['nombreRepresentants']).value,
      nombreSuppleants: this.editForm.get(['nombreSuppleants']).value,
      creationDate:
        this.editForm.get(['creationDate']).value != null ? moment(this.editForm.get(['creationDate']).value, DATE_TIME_FORMAT) : undefined,
      lastModificationDate:
        this.editForm.get(['lastModificationDate']).value != null
          ? moment(this.editForm.get(['lastModificationDate']).value, DATE_TIME_FORMAT)
          : undefined,
      partageRepresentants: this.editForm.get(['partageRepresentants']).value,
      natureJuridique: this.editForm.get(['natureJuridique']).value,
      secteur: this.editForm.get(['secteur']).value,
      typeStructure: this.editForm.get(['typeStructure']).value,
      deliberations: this.editForm.get(['deliberations']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrganisme>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackNatureJuridiqueById(index: number, item: INatureJuridique) {
    return item.id;
  }

  trackSecteurById(index: number, item: ISecteur) {
    return item.id;
  }

  trackTypeStructureById(index: number, item: ITypeStructure) {
    return item.id;
  }

  trackDeliberationById(index: number, item: IDeliberation) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
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
