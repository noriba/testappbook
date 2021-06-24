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


@Component({
  templateUrl: './step1.html',
  providers: [MessageService]

})
export class Step1 implements OnInit {

  personalInformation: any;

  submitted: boolean = false;
  items: MenuItem[];
  private isAdmin: any;
  private userUid: string;
  USERS: any;
  profile: any;

  steps: MenuItem[];

  home: MenuItem;

  contracts : any[];
  selectedContractType: any = null;

  subscription: Subscription;
  constructor( private dataApi: DataApiService,
               public messageService: MessageService,
               private authService: AuthService,
               private breadcrumb: BreadcrumbComponent,
               public ticketService: TicketService,
               private router: Router) {
    this.breadcrumb.activeIndex=1 ;

  }

  ngOnInit() {
    this.personalInformation = this.ticketService.getTicketInformation().personalInformation;

    this.setBreadCrumb();

    this.getCurrentUser();
  }

  nextPage() {

    if (this.personalInformation.firstname && this.personalInformation.lastname && this.personalInformation.age) {
      this.ticketService.ticketInformation.personalInformation = this.personalInformation;
      this.router.navigate(['step2']);

      return;
    }

    this.submitted = true;
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


}
