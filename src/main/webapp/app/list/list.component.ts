import { Component, OnInit } from '@angular/core';
import { ListService } from 'app/list/list.service';
import { IOrganisme } from 'app/shared/model/organisme.model';
import { JhiAlertService } from 'ng-jhipster';

@Component({
  selector: 'jhi-orgarif-list',
  templateUrl: './list.component.html',
  styleUrls: ['list.scss'],
})
export class ListComponent implements OnInit {
  organismes: IOrganisme[] = [];

  constructor(protected jhiAlertService: JhiAlertService, protected listService: ListService) {}

  ngOnInit(): void {
    this.listService.getLastOrganismes().subscribe(organismes => (this.organismes = organismes));
  }
}
