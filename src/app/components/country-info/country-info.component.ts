import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { SummaryCountry } from 'src/app/models/SummaryCountry';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.css']
})
export class CountryInfoComponent implements OnInit {

  @Input() public countryInfo: SummaryCountry;

  constructor() { }

  ngOnInit(): void {
  }

}
