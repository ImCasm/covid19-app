import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public slugStringEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  slugEmitter(slugString: string) {
    this.slugStringEmitter.emit(slugString);
  }

}
