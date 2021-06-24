import {Component,OnInit} from '@angular/core';
import { TicketService } from '../../stepsdemo/ticketservice';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import {MenuItem, MessageService} from 'primeng/api';
import {DataApiService} from '../../services/data-api.service';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {Breadcrumb} from 'primeng/breadcrumb';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {ViewChild, AfterViewInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {RadioButtonModule} from 'primeng/radiobutton';
import {StepsModule} from 'primeng/steps';


@Component({
  templateUrl: './step1.html',
  providers: [MessageService]

})
export class Step1 implements OnInit {

  constructor(private dataApi: DataApiService,
              private authService: AuthService,
              private router: Router,
              private messageService: MessageService) {  }

  @ViewChild(BreadcrumbComponent) child;

  private isAdmin: any;
  private userUid: string;
  USERS: any;
  items: MenuItem[];
  steps: MenuItem[];
  home: MenuItem;
  activeIndex: number = 1;

  ngOnInit() {
    this.setBreadCrumb();
    this.setsteps();
    this.getCurrentUser();
  }

  lastStepPlease(){
    this.child.lastStepPlease();
    this.router.navigate(['timesheet']);
  }

  nextStepPlease(){
    this.child.nextStepPlease();
    this.router.navigate(['step2']);
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
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
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
