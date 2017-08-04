import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FiltersComponent } from './filters.component';
import { StepComponent } from './step.component';
import { YtcardComponent } from './ytcard.component';

const routes: Routes = [
  {
    path: '',
    component: FiltersComponent
  },
  {
    path: 'searchresults',
    component: YtcardComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
