import { Component, OnInit } from '@angular/core';
import {BreadcrumbService} from '../services/breadcrumb.service';

@Component({
  template: `
    <p class="m-3">This component is breadcrumb'ed</p>
  `
})
export class MyBreadcrumbedComponent implements OnInit {

  constructor(private breadcrumb: BreadcrumbService) { }

  ngOnInit() {
    this.breadcrumb.setCrumbs([{
      label: 'A'
    }, {
      label: 'B'
    }, {
      label: 'C'
    }]);
  }
}
