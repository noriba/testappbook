import {Component, OnInit, Input, SimpleChanges} from '@angular/core';
import {TicketService} from '../../stepsdemo/ticketservice';
import {Route} from '@angular/compiler/src/core';
import {Router} from '@angular/router';
import {MenuItem, MessageService} from 'primeng/api';
import {DataApiService} from '../../services/data-api.service';
import {AuthService} from '../../services/auth.service';
import {Subscription, Observable} from 'rxjs';
import {Breadcrumb} from 'primeng/breadcrumb';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {ViewChild, ViewChildren, ContentChildren, ContentChild, AfterViewInit, OnChanges} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {RadioButtonModule} from 'primeng/radiobutton';
import {StepsModule} from 'primeng/steps';
import {Dayactivity, Timesheet} from '../../models/timesheet';
import {NgForm} from '@angular/forms';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {Product} from '../../models/products';
import {SelectItem} from 'primeng/api';

import {ProductService} from '../../services/product.service';
import {Dayovertime} from '../../models/timesheet';
import {BookInterface} from '../../models/book';
import DateTime from 'luxon/src/datetime.js';
import Duration from 'luxon/src/duration.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private sumValues: any;

  constructor(public dataApi: DataApiService,
              private authService: AuthService,
              private router: Router
  ) {
  }

  @ViewChild('myForm') ngForm: NgForm;
  private dayovertimes: Dayovertime[]=[];

  timesheet: Timesheet;
  private userInfo: firebase.User;
  private isAdmin: any;
  USERS: any;
  items: MenuItem[];
  steps: MenuItem[];
  home: MenuItem;
  activeIndex: number;
  data: Timesheet;
  days: string[];
  day: string;
  jours: string[];
  products: Product[];
  statuses: SelectItem[];
  clonedDayActivities: { [s: string]: Dayactivity; } = {};
  timesheets: Timesheet;
  dayactivities: Dayactivity[];
  private userUid: string;
  private dayratehours: number;
  contracts: string[] ;


  ngOnInit() {

    this.contracts=['CDI','CDD','INT'];


    this.getCurrentUser();
    // this.dataApi.getMyTimesheetsJSON().then(data => this.timesheets=data);
    this.getTimesheet('0FqFZh6mmPgDj5CUUMMO');

    this.dayactivities = this.timesheets.weekactivities;
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

  getTimesheet(id: string): void {
    this.dataApi.getOneTimesheet(id)
      .subscribe(timesheet => {
        console.log(timesheet);
        this.timesheet = timesheet;
        this.dayactivities = this.timesheet.weekactivities;
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
            activity.dayovertime.overtime = hsupp;
          } else {
            activity.dayovertime.overtime = 0;
          }

          console.log('hsupp : ' + hsupp);
          console.log('diff : ' + diff);
          console.log('diff2 : ' + dayminutes);
          console.log('diff3 : ' + dayhours);
          //desynchronisation entre dayoveertimes et dayactivities
          this.dayovertimes.push(activity.dayovertime);
          this.sumValues =  Object
            .keys(this.dayovertimes)
            .reduce((acc, value) => acc + this.dayovertimes[value], 0);

        });
      });
  }

}
