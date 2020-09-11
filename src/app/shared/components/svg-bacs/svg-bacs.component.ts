import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-bacs',
  templateUrl: './svg-bacs.component.html',
  styleUrls: ['./svg-bacs.component.scss'],
})
export class SvgBacsComponent implements OnInit {

  overlayHidden = false;

  constructor() { }

  ngOnInit() {}

  hideOverlay() {
    this.overlayHidden = true;
  }

}
