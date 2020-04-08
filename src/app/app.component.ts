import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'covid19-app';
  public slugString: string;

  slugStringEmitter($slugString: string) {
    this.slugString = $slugString;
  }
}
