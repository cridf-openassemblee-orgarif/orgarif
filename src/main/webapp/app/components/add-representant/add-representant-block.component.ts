import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRepresentant } from 'app/shared/model/representant.model';
import { EditionService } from '../../edition/edition.service';
import { Elu, IElu } from '../../shared/model/elu.model';
import { RepresentantOrSuppleant } from '../../shared/model/misc.model';

@Component({
  selector: 'jhi-orgarif-add-representant-block',
  templateUrl: './add-representant-block.component.html',
  styleUrls: ['add-representant-block.scss'],
})
export class AddRepresentantBlockComponent {
  @Input()
  _representants: IRepresentant[] = [];
  @Input()
  _elus: Elu[] = [];
  displayElus: Elu[] = [];
  @Input()
  public organismeId: number | undefined;
  @Input()
  public instanceId: number | undefined;
  // TODO-lazy-init
  @Input()
  public representantOrSuppleant: RepresentantOrSuppleant = null!;

  @Output()
  public representantsUpdate = new EventEmitter();

  public representantId: number | null = null;

  constructor(protected editionService: EditionService) {}

  @Input()
  set elus(elus: IElu[]) {
    this._elus = elus;
    this.setDisplayElus();
  }

  get elus(): IElu[] {
    return this._elus;
  }

  @Input()
  set representants(representants: IRepresentant[]) {
    this._representants = representants;
    this.setDisplayElus();
  }

  get representants(): IRepresentant[] {
    return this._representants;
  }

  setDisplayElus(): void {
    const alreadyRepresentants = this._representants.map(r => r.elu?.id);
    this.displayElus = this._elus.filter(e => !alreadyRepresentants.includes(e.id));
  }

  addRepresentant(eluId: number): void {
    const elu = this.elus.find(e => e.id === eluId)!;
    this.editionService.addElu(elu, this.organismeId, this.instanceId, this.representantOrSuppleant).subscribe(e => {
      this.representantsUpdate.emit(e);
    });
    setTimeout(() => {
      this.representantId = null;
    }, 0);
  }
}
