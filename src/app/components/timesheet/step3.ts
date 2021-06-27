import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TicketService} from '../../stepsdemo/ticketservice';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {DataApiService} from '../../services/data-api.service';
import {Dayactivity, Dayovertime, Timesheet} from '../../models/timesheet';
import {Product} from '../../models/products';


@Component({
  templateUrl: './step3.html',
  providers: [MessageService]
})
export class Step3 implements OnInit, AfterViewInit {

  @ViewChild(BreadcrumbComponent, {static: false}) child: BreadcrumbComponent;
  private timesheets: Timesheet[];
  private timesheet: Timesheet;
  private dayactivities: Dayactivity[];
  dayovertimes: Dayovertime[] = [];
  clonedDayOvertimes: { [s: string]: Dayovertime; } = {};


  constructor(
    public ticketService: TicketService,
    public dataApi: DataApiService,
    private router: Router) {
  }

  ngOnInit() {
    //this.dataApi.getMyTimesheetsJSON().then(data => this.timesheets = data);
    this.timesheets = this.dataApi.getMyTimesheets('test');
    this.timesheet = this.timesheets.filter(i => i.id == 1).shift();
    this.dayactivities = this.timesheet.weekactivities;
    this.dayactivities.forEach(i => {

      // TypeScript
      const moment=require("moment");
      let startDate=moment("2020-09-16 08:39:27");
      const endDate=moment();


      const duration=moment.duration(endDate.diff(startDate))
      console.log(duration.asSeconds());
      console.log(duration.asHours());

      var aa = duration.asHours();
      const today = new Date();
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

// Explicitly convert Date to Number
      const pastDaysOfYear = ( Number(today) - Number(firstDayOfYear) );

      //let overtime = i.dayend - i.daystart
      this.dayovertimes.push(i.dayovertime);
    });
    console.log('liste des heures supp : ' + JSON.stringify(this.dayovertimes));
  }

  onRowEditInit(dayovertime: Dayovertime, ri : number) {
    console.log("EDITING.....");
    this.clonedDayOvertimes[dayovertime.day] = {...dayovertime};
    this.dataApi.selectedDayOvertime = this.clonedDayOvertimes[dayovertime.day];
    console.log("selectedDayOvertime :  "+ JSON.stringify(this.dataApi.selectedDayOvertime));

    this.dataApi.selectedOtRow = ri;
    console.log("Selected product to editing ...  "+
      JSON.stringify(Object.assign({}, dayovertime)) )
  }

  onRowEditSave(dayovertime: Dayovertime) {
    console.log("SAVING..... "+ dayovertime.reason);
  }

  onRowEditCancel(dayovertime: Dayovertime, index: number) {
    console.log("CANCELlING..... " + dayovertime.reason);
    this.dayovertimes[index] = this.clonedDayOvertimes[dayovertime.day];
    delete this.clonedDayOvertimes[dayovertime.day];
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
