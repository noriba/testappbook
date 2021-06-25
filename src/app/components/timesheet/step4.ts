import {Component,OnInit,  ViewChild,AfterViewInit} from '@angular/core';
import { TicketService } from '../../stepsdemo/ticketservice';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';


@Component({
  templateUrl: './step4.html',
  providers: [MessageService  ]
})
export class Step4 implements OnInit , AfterViewInit{

  paymentInformation: any;
  @ViewChild(BreadcrumbComponent, { static: false }) child: BreadcrumbComponent;

  constructor(public ticketService: TicketService,
              private router: Router) { }

  ngOnInit() {
    this.paymentInformation = this.ticketService.ticketInformation.paymentInformation;
  }

  ngAfterViewInit() {
    this.child.activeIndex = 3;
  }

  lastStepPlease(){
    this.router.navigate(['step3']);
  }

  nextStepPlease(){
    this.ticketService.ticketInformation.paymentInformation = this.paymentInformation;
    this.router.navigate(['timesheet']);
  }
}
