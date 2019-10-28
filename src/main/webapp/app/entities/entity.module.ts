import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'nature-juridique',
        loadChildren: () => import('./nature-juridique/nature-juridique.module').then(m => m.OrgarifNatureJuridiqueModule)
      },
      {
        path: 'secteur',
        loadChildren: () => import('./secteur/secteur.module').then(m => m.OrgarifSecteurModule)
      },
      {
        path: 'type-structure',
        loadChildren: () => import('./type-structure/type-structure.module').then(m => m.OrgarifTypeStructureModule)
      },
      {
        path: 'deliberation',
        loadChildren: () => import('./deliberation/deliberation.module').then(m => m.OrgarifDeliberationModule)
      },
      {
        path: 'elu',
        loadChildren: () => import('./elu/elu.module').then(m => m.OrgarifEluModule)
      },
      {
        path: 'representant',
        loadChildren: () => import('./representant/representant.module').then(m => m.OrgarifRepresentantModule)
      },
      {
        path: 'instance',
        loadChildren: () => import('./instance/instance.module').then(m => m.OrgarifInstanceModule)
      },
      {
        path: 'organisme',
        loadChildren: () => import('./organisme/organisme.module').then(m => m.OrgarifOrganismeModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class OrgarifEntityModule {}
