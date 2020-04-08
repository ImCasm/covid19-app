import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { RestServiceService } from 'src/app/services/rest-service.service';
import { SummaryCountry } from 'src/app/models/SummaryCountry';

@Component({
  selector: 'app-cards-content',
  templateUrl: './cards-content.component.html',
  styleUrls: ['./cards-content.component.css']
})
export class CardsContentComponent implements OnInit, OnChanges, AfterViewChecked {

  @Input() public slugString: string;
  @Input() public countryInfo: any;
  @ViewChild('infoContent') infoContent: ElementRef;
  public countriesInfo = new Array<any>();
  public summaryInfo: SummaryCountry[];

  constructor(private _restService: RestServiceService) {
    this.summaryInfo = new Array<SummaryCountry>();
  }

  ngAfterViewChecked(): void {
    if (this.slugString || this.countriesInfo.length > 0) {
      this.scrollToContentInfo();
    }
  }

  ngOnInit(): void {
    this._restService.getSummary().subscribe(response => {
      response.Countries.forEach((el: SummaryCountry) => {
        this.summaryInfo.push(el);
      });
    }, error => {
      console.log(error);
    });
  }

  ngOnChanges(): void {

    this.countryInfo = this.findBySlug(this.slugString);

    if (this.countryInfo) {
      this.countriesInfo = new Array<any>();
    }
  }

  scrollToContentInfo() {
    this.infoContent.nativeElement.scrollIntoView();
  }

  showColombia() {
    this.countriesInfo = new Array<any>();
    this.slugString = 'colombia';
    this.countryInfo = this.findBySlug(this.slugString);
  }

  findBySlug(slug: string): SummaryCountry {
    let country: SummaryCountry;
    this.summaryInfo.forEach((el: SummaryCountry) => {
      if (el.Slug === slug) {
        country = el;
      }
    });

    return country;
  }

  getSummaryInfo() {
    this.countryInfo = undefined;
    this.summaryInfo.forEach((el: SummaryCountry) => {
      if (el) {
        this.countriesInfo.push(el);
      }
    });
  }
}
