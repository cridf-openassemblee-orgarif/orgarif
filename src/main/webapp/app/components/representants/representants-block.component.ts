import { Component, Input } from '@angular/core';
import { EditionService } from 'app/edition/edition.service';
import { IRepresentant, Representant } from '../../shared/model/representant.model';

@Component({
  selector: 'jhi-orgarif-representants-block',
  templateUrl: './representants-block.component.html',
  styleUrls: ['representants-block.scss'],
})
export class RepresentantsBlockComponent {
  _representants: IRepresentant[] = [];
  @Input()
  public editMode: Boolean = null!;

  @Input()
  set representants(representants: IRepresentant[]) {
    this._representants = representants.sort((a, b) => a.position! - b.position!);
  }

  get representants(): IRepresentant[] {
    return this._representants;
  }

  constructor(protected editionService: EditionService) {}

  up(representant: Representant): void {
    this.editionService.moveRepresentant(representant, representant.position! - 1).subscribe(r => {
      this.representants = r;
    });
  }
  down(representant: Representant): void {
    this.editionService.moveRepresentant(representant, representant.position! + 1).subscribe(r => {
      this.representants = r;
    });
  }
}
