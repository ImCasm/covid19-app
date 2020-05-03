import { Component, OnInit } from '@angular/core';
import { RestServiceService } from './services/rest-service.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'covid19-app';
  public slugString: string;
  public isMobile: boolean;


  constructor(private deviceService: DeviceDetectorService) {
    this.isMobile = this.deviceService.isMobile() || this.deviceService.isTablet();
  }

  ngOnInit() {
  }

  slugStringEmitter($slugString: string) {
    this.slugString = $slugString;
  }
}
