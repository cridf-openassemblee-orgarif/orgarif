import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  natureJuridiques: INatureJuridique[] = [];
  typeStructures: ITypeStructure[] = [];
  secteurs: ISecteur[] = [];
  elus: IElu[] = [];
  organismes: IOrganisme[] = [];
  deliberations: IDeliberation[] = [];
  deliberationsDataService: CompleterData | undefined;

  input: SaisieInput = this.emptyInput();

  isSaving = false;

  @ViewChild('nomInput', { static: false })
  nomInput: any;

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected saisieService: SaisieService,
    protected natureJuridiqueService: NatureJuridiqueService,
    protected typeStructureService: TypeStructureService,
    protected secteurService: SecteurService,
    protected listService: ListService,
    protected fb: FormBuilder,
    protected completerService: CompleterService
  ) {}

  emptyInput(): SaisieInput {
    return {
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

  ngOnInit(): void {
    this.isSaving = false;
    this.natureJuridiqueService.query().subscribe((res: HttpResponse<INatureJuridique[]>) => (this.natureJuridiques = res.body ?? []));
    this.typeStructureService.query().subscribe((res: HttpResponse<ITypeStructure[]>) => (this.typeStructures = res.body ?? []));
    this.secteurService.query().subscribe((res: HttpResponse<ISecteur[]>) => (this.secteurs = res.body ?? []));
    this.listService.getElus().subscribe(elus => (this.elus = elus));
    this.updateLists();
    this.input = this.emptyInput();
  }

  updateLists(): void {
    this.listService.getLastOrganismes().subscribe((organismes: IOrganisme[]) => (this.organismes = organismes));
    this.saisieService.lastDeliberations().subscribe((res: HttpResponse<IDeliberation[]>) => {
      this.deliberations = res.body ?? [];
      this.deliberationsDataService = this.completerService.local(this.deliberations, 'label', 'label');
    });
  }

  updateInstances(): void {
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

  deliberationSelected(deliberation: CompleterItem): void {
    this.input.deliberation = deliberation.originalObject;
  }

  instanceDeliberationSelected(deliberation: CompleterItem, i: number): void {
    this.input.instancesDeliberations[i] = deliberation.originalObject;
  }

  save(): void {
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
      id: undefined,
      nom: this.input.nom,

      nombreRepresentants,
      nombreSuppleants,
      partageRepresentants,

      creationDate: undefined,
      lastModificationDate: undefined,

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
    this.saisieService.create(organisme).subscribe(() => this.onSaveSuccess());
  }

  protected representants(elus: IElu[]): IRepresentant[] {
    return elus.map((e, i) => ({
      position: i,
      elu: {
        id: e.id,
      },
    }));
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.updateLists();
    this.input = this.emptyInput();
    this.nomInput.nativeElement.focus();
  }

  trackById(index: number, item: INatureJuridique | ITypeStructure | ISecteur): number | undefined {
    return item.id;
  }
}
