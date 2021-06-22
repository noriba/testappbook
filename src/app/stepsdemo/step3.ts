import {Component,OnInit} from '@angular/core';
import { TicketService } from './ticketservice';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import {BreadcrumbComponent} from '../components/breadcrumb/breadcrumb.component';


@Component({
  templateUrl: './step3.html',
  providers: [MessageService,BreadcrumbComponent
  ]

})export class Step3 implements OnInit {

  paymentInformation: any;

  constructor(public ticketService: TicketService,
              private breadcrumb: BreadcrumbComponent,

              private router: Router) { }

  ngOnInit() {
    this.paymentInformation = this.ticketService.ticketInformation.paymentInformation;
  }

  nextPage() {


    this.ticketService.ticketInformation.paymentInformation = this.paymentInformation;
    this.router.navigate(['step4']);
  }

  prevPage() {
    this.router.navigate(['step2']);
  }
}
