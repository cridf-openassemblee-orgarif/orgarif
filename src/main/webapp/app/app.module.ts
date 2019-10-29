import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OrgarifOrganismeBlockModule } from 'app/components/organisme-block.module';
import { OrgarifCoreModule } from 'app/core/core.module';
import { OrgarifListModule } from 'app/list/list.module';
import { OrgarifSaisieModule } from 'app/saisie/saisie.module';
import { OrgarifSharedModule } from 'app/shared/shared.module';
import { OrgarifAppRoutingModule } from './app-routing.module';
import { OrgarifEntityModule } from './entities/entity.module';
import { OrgarifHomeModule } from './home/home.module';
import { ErrorComponent } from './layouts/error/error.component';
import { FooterComponent } from './layouts/footer/footer.component';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import './vendor';

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
    OrgarifAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class OrgarifAppModule {}
