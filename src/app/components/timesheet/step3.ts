import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TicketService} from '../../stepsdemo/ticketservice';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {DataApiService} from '../../services/data-api.service';
import {Dayactivity, Dayovertime, Timesheet} from '../../models/timesheet';


@Component({
  templateUrl: './step3.html',
  providers: [MessageService]
})
export class Step3 implements OnInit, AfterViewInit {

  @ViewChild(BreadcrumbComponent, {static: false}) child: BreadcrumbComponent;
  private timesheets: Timesheet[];
  private timesheet: Timesheet;
  private dayactivities: Dayactivity[];
  private dayovertimes: Dayovertime[] = [];
  dayNames: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  constructor(
    public ticketService: TicketService,
    private dataApi: DataApiService,
    private router: Router) {
  }

  ngOnInit() {
    //this.dataApi.getMyTimesheetsJSON().then(data => this.timesheets = data);
    this.timesheets = this.dataApi.getMyTimesheets('test');
    this.timesheet = this.timesheets.filter(i => i.id == 1).shift();

    this.dayactivities = this.timesheet.weekactivities;
    this.dayactivities.forEach(i => this.dayovertimes.push(i.dayovertime));
    //console.log("liste des heures supp : "+this.dayovertimes);
    console.log('liste des heures supp : ' + JSON.stringify(this.dayovertimes));

  }

  ngAfterViewInit() {
    this.child.activeIndex = 2;
  }

  lastStepPlease() {
    this.router.navigate(['step2']);
  }

  nextStepPlease() {
    this.router.navigate(['step4']);
  }

  getValue(activity: Dayovertime) {
    return JSON.stringify(activity.overtime);
  }
}
