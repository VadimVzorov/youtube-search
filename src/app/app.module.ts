import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { AppComponent } from './app.component';
import { FiltersComponent } from './filters.component';
import { StepComponent } from './step.component';
import { YtcardComponent } from './ytcard.component';
import { YtwatchComponent } from './ytwatch.component';

@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    StepComponent,
    YtcardComponent,
    YtwatchComponent,
    YtcardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BootstrapModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
