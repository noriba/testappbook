import {Component,OnInit} from '@angular/core';
import { TicketService } from '../../stepsdemo/ticketservice';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';


@Component({
  templateUrl: './step4.html',
  providers: [MessageService]

})export class Step4 implements OnInit {

  ticketInformation: any;

  constructor(public ticketService: TicketService,
              private breadcrumb:BreadcrumbComponent,
              private router: Router) {  }

  ngOnInit() {
    this.ticketInformation = this.ticketService.ticketInformation;
  }

  complete() {
    this.ticketService.complete();
  }

  prevPage() {
    this.router.navigate(['step3']);
  }
}
