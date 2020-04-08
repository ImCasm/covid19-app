import { Component, OnInit } from '@angular/core';
import {RestServiceService} from '../../services/rest-service.service';

@Component({
  selector: 'app-data-summary',
  templateUrl: './data-summary.component.html',
  styleUrls: ['./data-summary.component.css']
})
export class DataSummaryComponent implements OnInit {



  public summary: any;

  constructor(
    private _restSercice: RestServiceService 
  ) { }

  ngOnInit(): void {
    this.getSummary();
  }

  getSummary() {
    this._restSercice.getSummary().subscribe(response => {
      this.summary = response.Global;
    }, error => {
      console.log(error);
    });
  }

}
