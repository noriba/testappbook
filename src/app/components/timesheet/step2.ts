import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem, MessageService, SelectItem} from 'primeng/api';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {DataApiService} from '../../services/data-api.service';
import {AuthService} from '../../services/auth.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {Dayactivity, Timesheet} from '../../models/timesheet';


@Component({
  selector: 'app-step2',
  templateUrl: './step2.html',
  providers: [MessageService]
})
export class Step2 implements OnInit {


  @ViewChild(BreadcrumbComponent, {static: false}) child: BreadcrumbComponent;
  days: string[];
  day: string;
  USERS: any;
  items: MenuItem[];
  steps: MenuItem[];
  home: MenuItem;
  activeIndex: number=1;
  jours: string[];
  statuses: SelectItem[];
  clonedDayActivities: { [s: string]: Dayactivity; } = {};
  timesheets: Timesheet;
  dayactivities: Dayactivity[];
  private isAdmin: any;
  private userUid: string;

  constructor(public dataApi: DataApiService,
              private authService: AuthService,
              private router: Router,
              private messageService: MessageService) {
    this.days = [
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
      'Dimanche'
    ];
  }




  ngOnInit() {
    Promise.resolve(null).then(() => this.child.activeIndex = 1);

    this.getCurrentUser();
    // this.dataApi.getMyTimesheetsJSON().then(data => this.timesheets=data);
    this.timesheets = this.dataApi.temporaryTimesheet;
    this.dayactivities = this.timesheets.weekactivities;
    console.log('liste des act : ' + JSON.stringify(this.dayactivities));
    console.log('temp timesheet : ' + JSON.stringify(this.timesheets));

  }

  onRowEditInit(dayactivity: Dayactivity, ri: number) {
    console.log('EDITING.....');

    this.clonedDayActivities[dayactivity.id] = {...dayactivity};
    this.dataApi.selectedDayActivity = this.clonedDayActivities[dayactivity.id];
    this.dataApi.selectedActRow = ri;
    console.log('Selected product to editing ...  ' +
      JSON.stringify(Object.assign({}, dayactivity)));
  }

  onRowEditSave(dayactivity: Dayactivity, index: number) {
    console.log('SAVING..... ' + JSON.stringify(dayactivity));


    this.dayactivities[index] = {...dayactivity};

    delete this.clonedDayActivities[dayactivity.id];

  }

  onRowEditCancel(dayactivity: Dayactivity, index: number) {
    console.log('CANCELlING..... ' + dayactivity.numberplate);
    this.dayactivities[index] = this.clonedDayActivities[dayactivity.id];
    delete this.clonedDayActivities[dayactivity.id];
  }


  lastStepPlease() {
    this.router.navigate(['step1']);
  }

  nextStepPlease() {
    this.router.navigate(['step3']);
  }

  setBreadCrumb() {
    this.items = [
      {label: 'Computer'},
      {label: 'Notebook'},
      {label: 'Accessories'},
      {label: 'Backpacks'},
      {label: 'Item'}
    ];
    this.home = {icon: 'pi pi-home'};
  }

  setsteps() {
    this.steps = [{

      label: 'Personal',
      command: (event: any) => {
        this.activeIndex = 0;
        this.messageService.add({
          severity: 'info',
          summary: 'First Step',
          detail: event.item.label
        });
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
    this.authService
      .isAuth()
      .subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService
          .isUserAdmin(this.userUid)
          .subscribe(userRole => {
          this.isAdmin = Object
            .assign({}, userRole.roles)
            .hasOwnProperty('admin');
        },err=>err);
      }
    },err=>err);
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


  createNewActivity(data) {

    this.dataApi.createNewActivity(data.value);
    console.log('new activity to create :' + JSON.stringify(data.value));
    data.resetForm();


  }

  onRowDelete(dayactivity: Dayactivity, index: number) {

    this.dayactivities.forEach( (item, index) => {
      if(item === dayactivity) this.dayactivities.splice(index,1);
    });
    //delete this.dayactivities[index] ;
console.log(JSON.stringify(this.dayactivities))
  }
}
