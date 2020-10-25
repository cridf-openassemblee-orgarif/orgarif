import { Component, Input } from '@angular/core';
import { IRepresentant } from '../../shared/model/representant.model';

@Component({
  selector: 'jhi-orgarif-representants-block',
  templateUrl: './representants-block.component.html',
  styleUrls: ['representants-block.scss'],
})
export class RepresentantsBlockComponent {
  _representants: IRepresentant[] = [];

  @Input()
  set representants(representants: IRepresentant[]) {
    this._representants = representants.sort((a, b) => a.position! - b.position!);
  }

  get representants(): IRepresentant[] {
    return this._representants;
  }
}
