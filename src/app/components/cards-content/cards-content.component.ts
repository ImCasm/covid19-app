import { Component, OnInit, Input } from '@angular/core';
import { Country } from 'src/app/models/Country';
import { RestServiceService } from 'src/app/services/rest-service.service';

@Component({
  selector: 'app-cards-content',
  templateUrl: './cards-content.component.html',
  styleUrls: ['./cards-content.component.css']
})
export class CardsContentComponent implements OnInit {

  @Input() public countryInfo: any;
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

  ngOnInit(): void { }



  showColombia() {
    this._restService.getCountryData('colombia').subscribe(response => {
      this.countryInfo = response[response.length - 1];
    },
    error => {
      console.log(error);
    });
  }

  getSummaryInfo() {


    this.showSummaryCountries = true;

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
    this.showSummaryCountries = false;
  }
}
