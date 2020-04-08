import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.css']
})
export class CountryInfoComponent implements OnInit {

  @Input() public countryInfo: any;
  @ViewChild('country1') country1: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  scrollCountry() {
    if (this.country1) {
      this.country1.nativeElement.scrollIntoView();
    }
  } 

}
