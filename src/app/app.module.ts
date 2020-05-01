import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MomentModule} from 'angular2-moment';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { HeaderComponent } from './components/header/header.component';
import { CountryInfoComponent } from './components/country-info/country-info.component';
import { CardsContentComponent } from './components/cards-content/cards-content.component';
import { DataSummaryComponent } from './components/data-summary/data-summary.component';
import { FooterComponent } from './components/footer/footer.component';
import { ColombiaDataTableComponent } from './components/colombia-data-table/colombia-data-table.component';
import { TestComponent } from './components/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HeaderComponent,
    CountryInfoComponent,
    CardsContentComponent,
    DataSummaryComponent,
    FooterComponent,
    ColombiaDataTableComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MomentModule,
    MDBBootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
