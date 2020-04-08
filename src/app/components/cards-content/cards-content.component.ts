import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { RestServiceService } from 'src/app/services/rest-service.service';

@Component({
  selector: 'app-cards-content',
  templateUrl: './cards-content.component.html',
  styleUrls: ['./cards-content.component.css']
})
export class CardsContentComponent implements OnInit, OnChanges, AfterViewChecked {

  @Input() public countryInfo: any;
  @ViewChild('infoContent') infoContent: ElementRef;
  public countriesInfo = new Array<any>();
  public showSummaryCountries: boolean;
  public summaryCountries = [
    'colombia',
    'venezuela',
    'ecuador',
    'peru',
    'uruguay',
    'argentina',
    'mexico',
    'bolivia',
    'brazil',
    'chile',
    'paraguay',
    'italy',
    'spain',
    'russia'
  ];

  constructor(
    private _restService: RestServiceService
  ) {
    this.showSummaryCountries = false;
  }
  ngAfterViewChecked(): void {
    this.scrollToContentInfo();
  }

  ngOnInit(): void { }

  ngOnChanges(): void {

    if (this.countryInfo) {
      this.countriesInfo = new Array<any>();
    }
  }

  scrollToContentInfo() {
    this.infoContent.nativeElement.scrollIntoView();
  }

  showColombia() {
    this.scrollToContentInfo();
    this.countriesInfo = new Array<any>();

    this._restService.getCountryData('colombia').subscribe(response => {
      this.countryInfo = response[response.length - 1];
    },
    error => {
      console.log(error);
    });
  }

  getSummaryInfo() {

    this.summaryCountries.forEach((e) => {

      this._restService.getCountryData(e).subscribe(response => {
        const infoC = response[response.length - 1];

        if (infoC) {
          this.countriesInfo.push({
            Country: infoC.Country,
            Confirmed: infoC.Confirmed,
            Deaths: infoC.Deaths,
            Recovered: infoC.Recovered,
            Active: infoC.Active,
            Date: infoC.Date,
          });
        }
      },
      error => {
        console.log(error);
      });
    });
    this.countryInfo = undefined;
    this.scrollToContentInfo();
  }
}
