import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { OrgarifSharedModule } from 'app/shared/shared.module';
import { OrgarifCoreModule } from 'app/core/core.module';
import { OrgarifAppRoutingModule } from './app-routing.module';
import { OrgarifHomeModule } from './home/home.module';
import { OrgarifEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';
import { OrgarifOrganismeBlockModule } from 'app/components/organisme-block.module';
import { OrgarifListModule } from 'app/list/list.module';
import { OrgarifSaisieModule } from 'app/saisie/saisie.module';

@NgModule({
  imports: [
    OrgarifOrganismeBlockModule,
    OrgarifListModule,
    OrgarifSaisieModule,

    BrowserModule,
    OrgarifSharedModule,
    OrgarifCoreModule,
    OrgarifHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    OrgarifEntityModule,
    OrgarifAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class OrgarifAppModule {}
