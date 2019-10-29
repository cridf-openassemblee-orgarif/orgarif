import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DeliberationService } from 'app/entities/deliberation/deliberation.service';
import { EluService } from 'app/entities/elu/elu.service';
import { NatureJuridiqueService } from 'app/entities/nature-juridique/nature-juridique.service';
import { SecteurService } from 'app/entities/secteur/secteur.service';
import { TypeStructureService } from 'app/entities/type-structure/type-structure.service';
import { ListService } from 'app/list/list.service';
import { SaisieService } from 'app/saisie/saisie.service';
import { IDeliberation } from 'app/shared/model/deliberation.model';
import { IElu } from 'app/shared/model/elu.model';
import { IInstance } from 'app/shared/model/instance.model';
import { INatureJuridique } from 'app/shared/model/nature-juridique.model';
import { IOrganisme } from 'app/shared/model/organisme.model';
import { IRepresentant } from 'app/shared/model/representant.model';
import { ISecteur } from 'app/shared/model/secteur.model';
import { ITypeStructure } from 'app/shared/model/type-structure.model';
import { JhiAlertService } from 'ng-jhipster';
import { CompleterData, CompleterItem, CompleterService } from 'ng2-completer';
import { filter, map } from 'rxjs/operators';

interface SaisieInput {
  nom: string;
  natureJuridique?: INatureJuridique;
  typeStructure?: ITypeStructure;
  secteur?: ISecteur;
  deliberation: IDeliberation;
  instancesAsString: string;
  instances: string[];
  representants: number[];
  suppleants: number[];
  instancesDeliberations: IDeliberation[];
  instancesRepresentants: number[][];
  instancesSuppleants: number[][];
  partageRepresentants: boolean;
}

@Component({
  selector: 'jhi-orgarif-saisie',
  templateUrl: './saisie.component.html',
  styleUrls: ['saisie.scss'],
})
export class SaisieComponent implements OnInit {
  natureJuridiques: INatureJuridique[];
  typeStructures: ITypeStructure[];
  secteurs: ISecteur[];
  elus: IElu[];
  organismes: IOrganisme[];
  deliberations: IDeliberation[];
  deliberationsDataService: CompleterData;

  input: SaisieInput;

  isSaving = false;

  @ViewChild('nomInput', { static: false })
  nomInput: any;

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected saisieService: SaisieService,
    protected natureJuridiqueService: NatureJuridiqueService,
    protected typeStructureService: TypeStructureService,
    protected secteurService: SecteurService,
    protected eluService: EluService,
    protected listService: ListService,
    protected deliberationService: DeliberationService,
    protected fb: FormBuilder,
    protected completerService: CompleterService
  ) {}

  resetInput() {
    this.input = {
      nom: '',
      natureJuridique: undefined,
      secteur: undefined,
      deliberation: {
        label: '',
        date: undefined,
      },
      instancesAsString: '',
      instances: [],
      representants: [],
      suppleants: [],
      instancesDeliberations: [],
      instancesRepresentants: [],
      instancesSuppleants: [],
      partageRepresentants: false,
    };
  }

  ngOnInit() {
    this.isSaving = false;
    this.natureJuridiqueService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<INatureJuridique[]>) => mayBeOk.ok),
        map((response: HttpResponse<INatureJuridique[]>) => response.body)
      )
      .subscribe(
        (res: INatureJuridique[]) => (this.natureJuridiques = res),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.typeStructureService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITypeStructure[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITypeStructure[]>) => response.body)
      )
      .subscribe(
        (res: ITypeStructure[]) => (this.typeStructures = res),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.secteurService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISecteur[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISecteur[]>) => response.body)
      )
      .subscribe(
        (res: ISecteur[]) => (this.secteurs = res),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.listService
      .getElus()
      .pipe(
        filter((mayBeOk: HttpResponse<IElu[]>) => mayBeOk.ok),
        map((response: HttpResponse<IElu[]>) => response.body)
      )
      .subscribe(
        (res: IElu[]) => (this.elus = res),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.updateLists();
    this.resetInput();
  }

  updateLists() {
    this.listService
      .lastOrganismes()
      .pipe(
        filter((mayBeOk: HttpResponse<IOrganisme[]>) => mayBeOk.ok),
        map((response: HttpResponse<IOrganisme[]>) => response.body)
      )
      .subscribe(
        (res: IOrganisme[]) => (this.organismes = res),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.saisieService
      .lastDeliberations()
      .pipe(
        filter((mayBeOk: HttpResponse<IDeliberation[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDeliberation[]>) => response.body)
      )
      .subscribe(
        (res: IDeliberation[]) => {
          this.deliberations = res;
          this.deliberationsDataService = this.completerService.local(this.deliberations, 'label', 'label');
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateInstances() {
    this.input.instances = this.input.instancesAsString
      .split(',')
      .map(i => i.trim())
      .filter(i => i !== '');
    this.input.instances.forEach((instance, index) => {
      if (!this.input.instancesRepresentants[index]) {
        this.input.instancesRepresentants[index] = [];
      }
      if (!this.input.instancesSuppleants[index]) {
        this.input.instancesSuppleants[index] = [];
      }
      if (!this.input.instancesDeliberations[index]) {
        this.input.instancesDeliberations[index] = {};
      }
    });
  }

  deliberationSelected(deliberation: CompleterItem) {
    this.input.deliberation = deliberation.originalObject;
  }

  instanceDeliberationSelected(deliberation: CompleterItem, i: number) {
    this.input.instancesDeliberations[i] = deliberation.originalObject;
  }

  save() {
    this.isSaving = true;
    const hasInstances = this.input.instances.length !== 0;
    const partageRepresentants = this.input.partageRepresentants;

    const organismeRepresentants = !hasInstances
      ? this.input.representants.map(r => ({
          id: r,
        }))
      : partageRepresentants
      ? this.input.instancesRepresentants[0].map(r => ({
          id: r,
        }))
      : [];
    const organismeSuppleants = !hasInstances
      ? this.input.suppleants.map(r => ({
          id: r,
        }))
      : partageRepresentants
      ? this.input.instancesSuppleants[0].map(r => ({
          id: r,
        }))
      : [];
    const nombreRepresentants = organismeRepresentants.length;
    const nombreSuppleants = organismeSuppleants.length;

    const organisme: IOrganisme = {
      id: null,
      nom: this.input.nom,

      nombreRepresentants,
      nombreSuppleants,
      partageRepresentants,

      creationDate: null,
      lastModificationDate: null,

      natureJuridique: this.input.natureJuridique,
      secteur: this.input.secteur,
      typeStructure: this.input.typeStructure,

      deliberations: !hasInstances ? [this.input.deliberation] : [],
      representants: this.representants(organismeRepresentants),
      suppleants: this.representants(organismeSuppleants),

      instances: this.input.instances.map((nomInstance, index) => {
        const representants = !partageRepresentants ? this.input.instancesRepresentants[index] : [];
        const suppleants = !partageRepresentants ? this.input.instancesSuppleants[index] : [];
        const instance: IInstance = {
          nom: nomInstance,

          nombreRepresentants: representants.length,
          nombreSuppleants: suppleants.length,

          deliberations: [this.input.instancesDeliberations[index]],
          representants: !partageRepresentants
            ? this.representants(
                representants.map(r => ({
                  id: r,
                }))
              )
            : [],
          suppleants: !partageRepresentants
            ? this.representants(
                suppleants.map(r => ({
                  id: r,
                }))
              )
            : [],
        };
        return instance;
      }),
    };
    this.saisieService.create(organisme).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected representants(elus: IElu[]): IRepresentant[] {
    return elus.map((e, i) => ({
      position: i,
      elu: {
        id: e.id,
      },
    }));
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.updateLists();
    this.resetInput();
    this.nomInput.nativeElement.focus();
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackById(index: number, item: INatureJuridique | ITypeStructure | ISecteur) {
    return item.id;
  }
}
