import {Component, OnInit, ViewChild} from '@angular/core';

import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {DataApiService} from '../../services/data-api.service';
import {Dayactivity, Dayovertime, Timesheet} from '../../models/timesheet';
import DateTime from 'luxon/src/datetime.js';
import Duration from 'luxon/src/duration.js';


@Component({
  templateUrl: './step3.html',
  providers: [MessageService]
})
export class Step3 implements OnInit {

  @ViewChild(BreadcrumbComponent, {static: false}) child: BreadcrumbComponent;
  private timesheets: Timesheet[];
  private timesheet: Timesheet;
  private dayactivities: Dayactivity[] = [];
  dayovertimes: Dayovertime[] = [];
  clonedDayOvertimes: { [s: string]: Dayovertime; } = {};
  private weekhoursplanned: number;
  private dayratehours: number;


  constructor(

    public dataApi: DataApiService,
    private router: Router) {
  }


  ngOnInit() {
    Promise.resolve(null).then(() => this.child.activeIndex = 2);

    //this.dataApi.getMyTimesheetsJSON().then(data => this.timesheets = data);

    //this.timesheets = this.dataApi.getMyTimesheets('test');
    //this.timesheet = this.timesheets.filter(i => i.id == 1).shift();
    this.timesheet = this.dataApi.temporaryTimesheet;
    this.weekhoursplanned = this.timesheet.weekhoursplanned;
    this.dayactivities = this.timesheet.weekactivities;
    console.log('Step3 ::: weekhoursplanned ' + typeof this.weekhoursplanned);

    // taux horaire theorique sur 5 jours
    this.dayratehours = this.weekhoursplanned / 5;

    this.computeOvertimes();
    console.log('liste des heures supp : ' + JSON.stringify(this.dayovertimes));
  }

  private computeOvertimes() {
    this.dayactivities.forEach(activity => {

      const date1 = DateTime.fromISO(activity.daystart);
      const date2 = DateTime.fromISO(activity.dayend).minus({minutes: activity.pause});
// nombre d'heures de travail
      const diff = date2.diff(date1, ['hours']).toObject();
      const dayminutes = Duration.fromObject(diff).as('minutes');
      const dayhours = Duration.fromObject(diff).as('hours');
      const hsupp = dayhours - this.dayratehours;
      activity.dayovertime = {overtime: 0, day: activity.day};
      if (hsupp > 0) {
        activity.dayovertime.overtime = Number(hsupp.toFixed(2)) ;
      } else {
        activity.dayovertime.overtime = 0;
      }

      console.log('hsupp : ' + hsupp);
      console.log('diff : ' + diff);
      console.log('diff2 : ' + dayminutes);
      console.log('diff3 : ' + dayhours);
      //desynchronisation entre dayoveertimes et dayactivities
      this.dayovertimes.push(activity.dayovertime);
    });
  }

  onRowEditInit(dayovertime: Dayovertime, ri: number) {
    console.log('EDITING.....');
    this.clonedDayOvertimes[dayovertime.day] = {...dayovertime};
    this.dataApi.selectedDayOvertime = this.clonedDayOvertimes[dayovertime.day];
    console.log('selectedDayOvertime :  ' + JSON.stringify(this.dataApi.selectedDayOvertime));

    this.dataApi.selectedOtRow = ri;
    console.log('Selected product to editing ...  ' +
      JSON.stringify(Object.assign({}, dayovertime)));
  }

  onRowEditSave(dayovertime: Dayovertime, index: number) {
    this.dataApi.temporaryTimesheet.weekactivities
      .filter(d => d.day == dayovertime.day)
      .map(d => d.dayovertime = {...dayovertime});

    this.dayovertimes[index] = {...dayovertime};
    delete this.clonedDayOvertimes[dayovertime.day];

    console.log('SAVING..... ' + dayovertime.reason);
    console.log('selected temp :  ' + JSON.stringify(this.dataApi.temporaryTimesheet.weekactivities));
    console.log('selected actual :  ' + JSON.stringify(this.dayovertimes[index]));

  }

  onRowEditCancel(dayovertime: Dayovertime, index: number) {
    console.log('CANCELlING..... ' + dayovertime.reason);
    this.dayovertimes[index] = this.clonedDayOvertimes[dayovertime.day];
    delete this.clonedDayOvertimes[dayovertime.day];
  }


  lastStepPlease() {
    this.router.navigate(['step2']);
  }

  nextStepPlease() {
    this.router.navigate(['step4']);
  }

  getValue(activity: Dayovertime) {
    // return JSON.stringify(activity.overtime);
  }
}
