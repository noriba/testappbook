import {DataApiService} from '../../services/data-api.service';
import {AuthService} from '../../services/auth.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {MenuItem, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {Timesheet} from '../../models/timesheet';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {UserDataService} from '../../services/user-data.service';
import {UserData} from '../../models/userdata';
import {TemplateEventEmitterService} from '../../services/template-event-emitter.service';
import DateTime from 'luxon/src/datetime.js';
import Duration from 'luxon/src/duration.js';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import {SendMailServiceService} from '../../services/send-mail-service.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {first,take} from 'rxjs/operators';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
  providers: [MessageService]
})
export class TimesheetComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  home: MenuItem;
  allTimesheets: Timesheet[];
  currentUserDatas: UserData;
  display: boolean = false;
  isLogged: Observable<boolean> ;
  isAdmin: Observable<boolean>;
  userUid: Observable<string>;
   myTimesheets: Timesheet[];

  constructor(private dataApi: DataApiService,
              private authService: AuthService,
              private userDataService: UserDataService,
              private router: Router,
              public templateEventEmitterService: TemplateEventEmitterService,
              private sendmailservice: SendMailServiceService,
              private fb: FormBuilder
              ) {  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin.pipe();
    this.isLogged = this.authService.isLogged.pipe();
    this.userUid = this.authService.userUid.pipe();

/*    this.authService.currentUser$.subscribe(userid => {
      if (userid) {
        this.isLogged = true;
        this.userUidSub.next(userid.uid);
      }
      this.isLogged = false;
    }, err => console.log('error', err), () => console.log('completed'));*/

    // this.getCurrentUser();
    !this.isAdmin?this.getMyTimesheets(this.userUid):this.getAllTimesheets();
  }


  getAllTimesheets() {
    console.log('Get All Timmesheets ::: ', this.isAdmin);
    this.dataApi
      .getAllTimesheets()
      .subscribe(timesheets => {
          this.allTimesheets = timesheets;
          console.log('Timesheets list :::' + JSON.stringify(this.allTimesheets));
        },
        err => console.log('error', err),
        () => console.log('completed'));
  }

  getMyTimesheets(userid) {
    console.log('Get my Timesheets ::: ', this.isAdmin, '  userid= ', userid);
     this.dataApi
      .getMyTimesheets(userid)
      .subscribe(timesheets => {
          this.myTimesheets = timesheets;
          console.log('Timeseehts list :::' + JSON.stringify(this.allTimesheets));
        },
        err => console.log('error', err),
        () => console.log('completed'));
  }

  lastStepPlease() {
    this.router.navigate(['step1']);
  }

  nextStepPlease() {
    this.dataApi.resetTemporaryTimesheet(this.currentUserDatas);
    this.router.navigate(['step1']);
  }

/*

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.isLogged .true;
        this.userUid = auth.uid;
        this.userDataService
          .isUserAdmin( auth.uid).pipe(take(1))
          .subscribe(userRole => {
            this.isAdmin.next(Object
              .assign({}, userRole.roles)
              .hasOwnProperty('admin'));
            if (this.isAdmin) {
              console.log('admin =' + this.isAdmin);

              this.getAllTimesheets();
            } else {
              console.log('admin =' + this.isAdmin);

              this.getMyTimesheets(this.userUid);
            }
            this.currentUserDatas = {...userRole};
            console.log('ADMINISTRATEUR 1 :::' + this.isAdmin);
          }, err => console.log('error', err), () => console.log('completed'));
      } else {
        this.isLogged = false;
      }
    }, err => console.log('error', err));
  }

*/

  openPDF(): void {

    // let DATA = document.getElementById('htmlData');
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
      var pdf = new jsPDF('l', 'pt', [canvas.width, canvas.height]);
      var imgData = canvas.toDataURL('PNG', 1.0);
      pdf.addImage(imgData, 0, 0, (canvas.width), (canvas.height));
      pdf.save('converteddoc.pdf');

    });


  }


  onDeleteTimesheet(idTimesheet: string): void {
    console.log('Timeseehts ID to delete  :::' + idTimesheet);

    const confirmation = confirm('Veuillez confirmer');
    if (confirmation) {
      this.dataApi.deleteTimesheet(idTimesheet).then((res) => {
      }).catch(err => {
        console.log('err', err.message);
      });
    }
  }

  onPreUpdateTimesheet(timesheet: Timesheet) {
    console.log('BOOK', timesheet);
    this.dataApi.temporaryTimesheet = timesheet;
    this.dataApi.selectedTimesheet = Object.assign({}, timesheet);
    this.router.navigate(['step1']);
  }


  onSendTimesheet(timesheet: Timesheet) {
    console.log(timesheet.id);
    this.display = true;
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
    //this.templateEventEmitterService.onFirstComponentButtonClick(timesheet);
    //this.openPDF();
  }

  eventemit(timesheet) {
    this.templateEventEmitterService.onFirstComponentButtonClick(timesheet);
    this.sendMail(timesheet);
  }


  infoForm = this.fb.group({
    name: ['',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],
    email: ['',
      [
        Validators.required,
        Validators.email
      ]
    ]
  });

  get name() {
    return this.infoForm.get('name');
  }

  get email() {
    return this.infoForm.get('email');
  }


  sendMail(timesheet: Timesheet) {
    console.log(this.infoForm.value);
    this.subscription = this.sendmailservice.sendEmail(this.currentUserDatas, timesheet).subscribe(
      data => {
        let msg = data['message'];
        alert(msg);
        console.log(data, 'success');
      }, error => {
        console.error(error, 'error');
      });
  }


  ngOnDestroy() {
  }


}
