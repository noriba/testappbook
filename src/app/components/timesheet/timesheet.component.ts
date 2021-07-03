import {Component, OnInit} from '@angular/core';
import {DataApiService} from '../../services/data-api.service';
import {AuthService} from '../../services/auth.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {MenuItem, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {Timesheet} from '../../models/timesheet';
import {Subject,BehaviorSubject } from 'rxjs';
import {UserDataService} from '../../services/user-data.service';
import {UserData} from '../../models/userdata';


@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
  providers: [MessageService]
})
export class TimesheetComponent implements OnInit {

  isAdmin: boolean = false;
  userUid: string;
  userUidSub = new BehaviorSubject<string>('');
  USERS: any;
  items: MenuItem[];
  steps: MenuItem[];
  home: MenuItem;
  activeIndex: number;
  isAdminSub = new Subject<boolean>();
  private isLogged: boolean;
   allTimesheets: Timesheet[];
  private currentUserDatas: UserData;

  constructor(private dataApi: DataApiService,
              private authService: AuthService,
              private userDataService: UserDataService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {

    this.authService.currentUser$.subscribe(userid => {
      console.log(userid.uid);
      this.userUidSub.next(userid.uid);
    });

    this.getCurrentUser();
  }


  getAllTimesheets() {
    console.log('Get All Timmesheets ::: ', this.isAdmin);
    this.dataApi
      .getAllTimesheets()
      .subscribe(timesheets => {
        this.allTimesheets = timesheets;
        console.log('Timesheets list :::' + JSON.stringify(this.allTimesheets));
      });
  }

  getMyTimesheets(userid) {
    console.log('Get my Timesheets ::: ', this.isAdmin, "  userid= ", userid);
      return this.dataApi
        .getMyTimesheets(userid)
        .subscribe(timesheets => {
          this.allTimesheets = timesheets;
          console.log('Timeseehts list :::' + JSON.stringify(this.allTimesheets));
        });
  }

  lastStepPlease() {
    this.router.navigate(['step1']);
  }

  nextStepPlease() {
    this.dataApi.resetTemporaryTimesheet(this.currentUserDatas);
    this.router.navigate(['step1']);
  }


  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.isLogged = true;
        this.userUid = auth.uid;
        this.userDataService
          .isUserAdmin(this.userUid)
          .subscribe(userRole => {
            this.isAdmin = Object
              .assign({}, userRole.roles)
              .hasOwnProperty('admin');
            if (this.isAdmin) {
              console.log('admin =' + this.isAdmin);

              this.getAllTimesheets();
            } else {
              console.log('admin =' + this.isAdmin);

              this.getMyTimesheets(this.userUidSub.value);
            }
            this.currentUserDatas = {...userRole};
            console.log('ADMINISTRATEUR 1 :::' + this.isAdmin);
          });
      } else {
        this.isLogged = false;
      }
    });
  }


  openPDF(): void {
    let DATA = document.getElementById('htmlData');

    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

      PDF.save('angular-demo.pdf');
    });
  }

  onDeleteTimesheet(idTimesheet: string): void {
    console.log('Timeseehts ID to delete  :::' + idTimesheet);

    const confirmation = confirm('Veuillez confirmer');;
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


  onSendTimesheet(id) {
    
  }
}
