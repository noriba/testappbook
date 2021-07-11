import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem, MessageService} from 'primeng/api';
import {DataApiService} from '../../services/data-api.service';
import {AuthService} from '../../services/auth.service';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {Timesheet} from '../../models/timesheet';
import {NgForm} from '@angular/forms';


@Component({
  templateUrl: './step1.html',
  providers: [MessageService]
})
export class Step1 implements OnInit {


  constructor(public dataApi: DataApiService,
              private authService: AuthService,
              private router: Router,
              private messageService: MessageService) {
  }

  @ViewChild(BreadcrumbComponent, {static: false}) child: BreadcrumbComponent;
  @ViewChild('myForm') ngForm: NgForm;
  @Input() userUid: string;

  timesheet: Timesheet;
  private userInfo: firebase.User;
  private isAdmin: any;
  USERS: any;
  items: MenuItem[];
  steps: MenuItem[];
  home: MenuItem;
  activeIndex: number;
  data: Timesheet;
  contracts: string[];


  ngOnInit() {
    Promise.resolve(null).then(() => this.child.activeIndex = 0);
    this.contracts = ['CDI', 'CDD', 'INT'];

    console.log('Selected timesheet ::: ' +
      JSON.stringify(this.dataApi.temporaryTimesheet));

    this.timesheet = this.dataApi.temporaryTimesheet;
    this.getCurrentUser();
    //this.timesheet.lastname= this.userInfo.displayName;

  }

  lastStepPlease() {
    this.router.navigate(['timesheet']);
  }

  nextStepPlease(data: NgForm): void {
    data.value.userUid=this.authService.userUid;
    console.log('Selected timesheet ::: ' +
      JSON.stringify(this.dataApi.selectedTimesheet));
    !this.dataApi.selectedTimesheet.lastname ?
      this.createNewTimesheet(data) : this.updateTimesheet(data);
    this.router.navigate(['step2']);
  }

  updateTimesheet(data: NgForm) {
    //this.router.navigate(['step2']);
    console.log(':::::updateTimesheet::::::::::current user :::::: '
      + this.userUid);
    data.value.userUid = this.userUid;
    //this.dataApi.createNewtemporaryTimesheet(data.value)
  }


  createNewTimesheet(data: NgForm) {
    // console.log(":::::::::::::::On va creer ces données :::::: "+JSON.stringify(data) );
    console.log('::::::createNewTimesheet:::::::::current user :::::: '
      + this.userUid);
    // this.dataApi.resetTemporaryTimesheet(this.currentUserDatas);
    console.log('Temporary timesheet reset :'
      + JSON.stringify(this.dataApi.temporaryTimesheet));

    data.value.userUid = this.userUid;
    this.dataApi.createNewtemporaryTimesheet(data.value);
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
        this.userUid = auth.uid;
        this.userInfo = auth;
        console.log('USER infos ::: ', auth);
        this.authService
          .isUserAdmin(this.userUid)
          .subscribe(userRole => {
            this.isAdmin = Object
              .assign({}, userRole.roles)
              .hasOwnProperty('admin');
          });
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


}
