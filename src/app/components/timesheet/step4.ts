import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {Dayactivity, Timesheet} from '../../models/timesheet';
import {DataApiService} from '../../services/data-api.service';
import {UserData} from '../../models/userdata';


@Component({
  templateUrl: './step4.html',
  providers: [MessageService]
})
export class Step4 implements OnInit {

  @ViewChild(BreadcrumbComponent, {static: false}) child: BreadcrumbComponent;
  weekhoursplanned: number;
  dayactivities: Dayactivity[];
  weekovertime: number = 0;
  weekhours: number = 0;
  msgError: string;
  isError: any;
  private timesheet: Timesheet;
  private timesheets: Timesheet[];
  private alltimesheets: Timesheet[];
  private currentUserDatas: UserData;


  constructor(
    public dataApi: DataApiService,
    private router: Router) {
  }


  ngOnInit() {
    Promise.resolve(null).then(() => this.child.activeIndex = 3);

    //this.dataApi.getMyTimesheetsJSON().then(data => this.timesheets = data);
    //this.timesheets = this.dataApi.getMyTimesheets('test');
    //this.timesheet = this.timesheets.filter(i => i.id == 1).shift();
    this.timesheet = this.dataApi.temporaryTimesheet;
    this.weekhoursplanned = this.timesheet.weekhoursplanned;
    this.dayactivities = this.timesheet.weekactivities;
    this.dayactivities.forEach(i => {
      this.weekovertime += i.dayovertime.overtime;
      console.log(i.day + ' >> ' + this.weekovertime + ' heures supp');
      return this.weekovertime;
    });
    console.log('Vous avez cumulé cette semaine >> ' + this.weekovertime + ' heures supp');
    this.weekhours = (this.weekhoursplanned / 5) * this.dayactivities.length + this.weekovertime;
    console.log('Vous avez cumulé cette semaine >> ' + this.weekhours + ' heures travaillées');
    this.dataApi.temporaryTimesheet.weekhoursdone = Number(this.weekhours.toFixed(2));
    this.dataApi.temporaryTimesheet.statusmanager.comment = 'hello';
    this.dataApi.temporaryTimesheet.statusmanager.signature = 'hello';
    this.dataApi.temporaryTimesheet.statusmanager.signaturedate = 'hello';
    this.dataApi.temporaryTimesheet.statusmanager.status = true;

    console.log('TIMESHEET ::: ' + JSON.stringify(this.dataApi.temporaryTimesheet));

  }


  lastStepPlease() {
    this.router.navigate(['step3']);
  }

  nextStepPlease() {
    let timesheet = this.dataApi.temporaryTimesheet;
    if (timesheet.id == null) {
      console.log('id == null ::: calling createNewTimesheet()...');
      this.dataApi.createNewTimesheet(timesheet)
        .then(() => {
          res =>
            console.log('success createNewTimesheet() ::: ' + res.message);

          //this.dataApi.resetTemporaryTimesheet(this.currentUserDatas);
        })
        .catch(err => {
          //console.log(err.message +"   " + this.dataApi.temporaryTimesheet);

          this.isError = true;
          this.msgError = err.message;
          console.log('error createNewTimesheet() ::: ' + err.message);
        });
    } else {
      // Update
      this.dataApi.updateTimesheet(timesheet)
        .then(() => {
        })
        .catch(err => {
          this.isError = true;
          this.msgError = err.message;
          console.log('error createNewTimesheet() ::: ' + err.message);
        });

    }

    console.log(this.dataApi.temporaryTimesheet);

    this.router.navigate(['timesheet']);
  }
}
