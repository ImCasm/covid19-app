import { Component, OnInit } from '@angular/core';
import { RestServiceService } from './services/rest-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'covid19-app';
  public slugString: string;


  constructor() {
  }

  ngOnInit() {
  }

  slugStringEmitter($slugString: string) {
    this.slugString = $slugString;
  }
}
