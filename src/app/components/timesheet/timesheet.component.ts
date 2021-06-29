import {Component, OnInit} from '@angular/core';
import {DataApiService} from '../../services/data-api.service';
import {AuthService} from '../../services/auth.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {MenuItem, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {Timesheet} from '../../models/timesheet';


@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
  providers: [MessageService]
})
export class TimesheetComponent implements OnInit {

  constructor(private dataApi: DataApiService,
              private authService: AuthService,
              private router: Router,
              private messageService: MessageService) {

  }

  isAdmin: any;
  userUid: string;
  USERS: any;
  items: MenuItem[];
  steps: MenuItem[];
  home: MenuItem;
  activeIndex: number;
  myTimesheets: Timesheet[];

  ngOnInit() {
    // this.userUid= JSON.parse(localStorage.getItem('user')).uid;
    // this.getMyTimesheets(this.userUid);
    // console.log(JSON.parse(localStorage.getItem('user')).uid );

  /*  this.authService.isAuth().subscribe(userid => {
      console.log('userid = ' + userid.uid);
      this.getMyTimesheets(userid.uid);
    });*/
    this.authService.getUser().then(userid=> this.getMyTimesheets(userid))
  }

  getMyTimesheets(userid) {

    this.dataApi.getMyTimesheets(userid).subscribe((res => res));


  }

  lastStepPlease() {
    this.router.navigate(['step1']);
  }

  nextStepPlease() {
    this.router.navigate(['step1']);
  }


  setsteps() {
    this.steps = [{

      label: 'Personal',
      command: (event: any) => {
        this.activeIndex = 0;
        this.messageService.add({severity: 'info', summary: 'First Step', detail: event.item.label});
      }
    },
      {
        label: 'Seat',
        command: (event: any) => {
          this.activeIndex = 1;
          this.messageService.add({severity: 'info', summary: 'Seat Selection', detail: event.item.label});
        }
      },
      {
        label: 'Confirmation',
        command: (event: any) => {
          this.activeIndex = 3;
          this.messageService.add({severity: 'info', summary: 'Last Step', detail: event.item.label});
        }
      }
    ];
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        //this.userUid = auth.uid;
        this.authService
          .isUserAdmin(this.userUid)
          .subscribe(userRole => {
            this.isAdmin = Object
              .assign({}, userRole.roles)
              .hasOwnProperty('admin');
          });
      }
    });

    //this.userUid.subscribe(user => this.getMyTimesheets(user));


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
    const confirmacion = confirm('Are you sure?');
    if (confirmacion) {
      this.dataApi.deleteTimesheet(idTimesheet).then((res) => {
      }).catch(err => {
        console.log('err', err.message);
      });
    }
  }

  onPreUpdateTimesheet(timesheet: Timesheet) {
    console.log('BOOK', timesheet);
    this.dataApi.selectedTimesheet = Object.assign({}, timesheet);
  }
}
