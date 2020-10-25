import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'app/core/auth/account.service';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { JhiAlertService, JhiDataUtils, JhiDateUtils, JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { MockAccountService } from './helpers/mock-account.service';
import { MockActiveModal } from './helpers/mock-active-modal.service';
import { MockAlertService } from './helpers/mock-alert.service';
import { MockEventManager } from './helpers/mock-event-manager.service';
import { MockLoginModalService } from './helpers/mock-login-modal.service';
import { MockActivatedRoute, MockRouter } from './helpers/mock-route.service';

@NgModule({
  providers: [
    DatePipe,
    JhiDataUtils,
    JhiDateUtils,
    JhiParseLinks,
    {
      provide: JhiEventManager,
      useClass: MockEventManager,
    },
    {
      provide: NgbActiveModal,
      useClass: MockActiveModal,
    },
    {
      provide: ActivatedRoute,
      useValue: new MockActivatedRoute({ id: 123 }),
    },
    {
      provide: Router,
      useClass: MockRouter,
    },
    {
      provide: AccountService,
      useClass: MockAccountService,
    },
    {
      provide: LoginModalService,
      useClass: MockLoginModalService,
    },
    {
      provide: JhiAlertService,
      useClass: MockAlertService,
    },
    {
      provide: NgbModal,
      useValue: null,
    },
    {
      provide: SessionStorageService,
      useValue: null,
    },
    {
      provide: LocalStorageService,
      useValue: null,
    },
  ],
  imports: [HttpClientTestingModule],
})
export class OrgarifTestModule {}
