import {Component, OnInit, ViewChild, ViewEncapsulation, Renderer2, AfterContentInit} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem, SelectItem} from 'primeng/api';
import {DataApiService} from '../../services/data-api.service';
import {AuthService} from '../../services/auth.service';
import {Dayactivity, Dayovertime, Timesheet} from '../../models/timesheet';
import {NgForm} from '@angular/forms';

import DateTime from 'luxon/src/datetime.js';
import Duration from 'luxon/src/duration.js';
import html2canvas from 'html2canvas';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import h2c from 'html2canvas';
import {TemplateEventEmitterService} from '../../services/template-event-emitter.service';
import jsPDF from 'jspdf';
import {BehaviorSubject,Observable,of, Subject} from 'rxjs';
import {

  startWith,
  audit,
  auditTime,
  debounce,
  debounceTime,
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  elementAt,
  filter,
  first,
  ignoreElements,
  last,
  sample,
  sampleTime,
  single,
  skip,
  skipLast,
  skipUntil,
  skipWhile,
  take,
  takeLast,
  takeUntil,
  takeWhile,
  throttle,
  throttleTime,
  mergeAll,finalize,exhaust,reduce,publishLast,tap
} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {


  constructor(public dataApi: DataApiService,
              private authService: AuthService,
              public templateEventEmitterService: TemplateEventEmitterService,
              private renderer: Renderer2,
              private router: Router) {  }

  @ViewChild('myForm') ngForm: NgForm;


  timesheet: Timesheet;
  private userInfo: firebase.User;



  home: MenuItem;

  data: Timesheet;

  day: string;




  contracts: string[];

  isLogged: Observable<boolean> ;
  isAdmin: Observable<boolean>;
  userUid: Observable<string>;

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin.pipe();
    this.isLogged = this.authService.isLogged.pipe();
    this.userUid = this.authService.userUid.pipe();
    this.contracts = ['CDI', 'CDD', 'INT'];
    //this.getCurrentUser();
    // this.dataApi.getMyTimesheetsJSON().then(data => this.timesheets=data);
    //this.getTimesheet(this.idtimesheet);
    //this.getTimesheet(this.idtimesheet);
    if (this.templateEventEmitterService.subsVar == undefined) {
      this.templateEventEmitterService.subsVar =
        this
          .templateEventEmitterService
          .invokeFirstComponentFunction
          .subscribe((name: Timesheet) => {
            console.log('constructeur de home comp :: ' + name);
            this.timesheet=name ;
            this.setTemplate(this.timesheet);
            this.onChanges();
          }, err=>             console.log(err)
    );
    }
  }

  onChanges(): void {
    console.log(this.dataApi.selectedTimesheet.id)
    this.ngForm.valueChanges.pipe(sampleTime(100)).subscribe(
      val =>  this.openPDF(),
      err => console.log('error:', err),
      () => console.log('the end'),);
  }

  setTemplate(timesheet: Timesheet) {
    this.dataApi.selectedTimesheet = Object.assign({}, timesheet);
    this.dataApi.selectedTimesheetDayActivities = this.dataApi.selectedTimesheet.weekactivities;
    this.dataApi.selectedTimesheetDayActivities.forEach(activity => {
      const date1 = DateTime.fromISO(activity.daystart);
      const date2 = DateTime.fromISO(activity.dayend).minus({minutes: activity.pause});
      // nombre d'heures de travail
      const diff = date2.diff(date1, ['hours']).toObject();
      const dayminutes = Duration.fromObject(diff).as('minutes');
      const dayhours = Duration.fromObject(diff).as('hours');
      let dayratehours = this.dataApi.selectedTimesheet.weekhoursplanned / 5;

      const hsupp = dayhours - dayratehours;
      activity.dayovertime = {overtime: 0, day: activity.day};
      if (hsupp > 0) {
        activity.dayovertime.overtime = hsupp;
      } else {
        activity.dayovertime.overtime = 0;
      }
      //desynchronisation entre dayoveertimes et dayactivities
      this.dataApi.selectedTimesheetDayovertimes.push(activity.dayovertime);
      this.dataApi.selectedTimesheetSumOvertimes += activity.dayovertime.overtime;
      this.dataApi.selectedTimesheetSumHoursDone += dayhours;
    });
  }

/*  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.userInfo = auth;
        console.log('USER infos ::: ', auth);
        this.authService
          .isUserAdmin(this.userUid)
          .subscribe(userRole => {
            this.isAdmin = Object
              .assign({}, userRole.roles)
              .hasOwnProperty('admin');
          },err=>console.log(err));
      }
    },err=>console.log(err));
  }*/

  openPDF(): void {
    console.log(this.dataApi.selectedTimesheet.id)
    let DATA = document.getElementById('htmlData');
    // DATA.style.visibility='visible';

    html2canvas(DATA, {
        onclone: function (clonedDoc) {
          // I made the div hidden and here I am changing it to visible
          clonedDoc.getElementById('htmlData').style.visibility = 'visible';
        }
      }
    ).then(canvas => {
      // The following code is to create a pdf file for the taken screenshot
      var pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
      var imgData = canvas.toDataURL('PNG', 1.0);
      pdf.addImage(imgData, 0, 0, (canvas.width), (canvas.height));
      pdf.save('feuille_de_temps.pdf');

    });
  }


  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  modelChangeFn(timesheet){
    debugger
    this.templateEventEmitterService.onFirstComponentButtonClick(timesheet);
  }

}
