import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RestServiceService } from 'src/app/services/rest-service.service';
import { Country } from '../../models/Country';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public selectedCountry: any;
  public slugString: string;
  public countries: Country[];


  @Output() public slugStringEmitter = new EventEmitter();

  constructor(
    private _restServiceService: RestServiceService
  ) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    this._restServiceService.getCountries().subscribe(response => {
      this.countries = response.sort((a, b) => {

        const bandA = a.Country.toUpperCase();
        const bandB = b.Country.toUpperCase();

        let comparison = 0;
        if (bandA > bandB) {
          comparison = 1;
        } else if (bandA < bandB) {
          comparison = -1;
        }
        return comparison;
      });
    },
      error => {
        console.log(error);
      });
  }

  getSelectedCountry(slugString: string) {
    this.slugString = slugString;
    this.emmitCountryInfo();
  }

  emmitCountryInfo() {
    this.slugStringEmitter.emit(this.slugString);
  }

}
