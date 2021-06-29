import {Component,OnInit,  ViewChild,AfterViewInit} from '@angular/core';
import { TicketService } from '../../stepsdemo/ticketservice';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {Dayactivity, Timesheet} from '../../models/timesheet';
import {DataApiService} from '../../services/data-api.service';


@Component({
  templateUrl: './step4.html',
  providers: [MessageService  ]
})
export class Step4 implements OnInit , AfterViewInit{

  paymentInformation: any;
  @ViewChild(BreadcrumbComponent, { static: false }) child: BreadcrumbComponent;
  private timesheets: Timesheet[];
  private timesheet: Timesheet;
  weekhoursplanned: number;
   dayactivities: Dayactivity[];
   weekovertime: number = 0;
   weekhours: number = 0 ;

  constructor(
    public ticketService: TicketService,
    public dataApi: DataApiService,
    private router: Router) {
  }

  ngOnInit() {
    //this.dataApi.getMyTimesheetsJSON().then(data => this.timesheets = data);

    this.timesheets = this.dataApi.getMyTimesheets('test');
    this.timesheet = this.timesheets.filter(i => i.id == 1).shift();
    this.weekhoursplanned = this.timesheet.weekhoursplanned;
    this.dayactivities = this.timesheet.weekactivities;
    this.dayactivities.forEach(i=> {
      console.log(i.day+" "+this.weekovertime +" heures");
      return this.weekovertime += i.dayovertime.overtime;
    });



    this.weekhours = this.weekhoursplanned+this.weekovertime;

    console.log(this.weekovertime);
    console.log(this.weekhours);
  }

  ngAfterViewInit() {
    this.child.activeIndex = 3;
  }

  lastStepPlease(){
    this.router.navigate(['step3']);
  }

  nextStepPlease(){
    this.ticketService.ticketInformation.paymentInformation = this.paymentInformation;
    this.router.navigate(['timesheet.ts']);
  }
}
