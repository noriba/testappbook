import {TicketService} from './ticketservice';
import {Subscription} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {DataApiService} from '../services/data-api.service';
import {AuthService} from '../services/auth.service';
import {MenuItem, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {BreadcrumbComponent} from '../components/breadcrumb/breadcrumb.component';


@Component({
  templateUrl: './stepsdemo.component.html',
  styleUrls: ['stepsdemo.component.css'],
  providers: [MessageService]
})
export class StepsdemoComponent implements OnInit {

  items: MenuItem[];
  private isAdmin: any;
  private userUid: string;
  USERS: any;
  profile: any;
  steps: MenuItem[];
  home: MenuItem;
  submitted: boolean = false;
  contracts: any[];
  selectedContractType: any = null;

  subscription: Subscription;

  constructor(public messageService: MessageService,
              public ticketService: TicketService,
              private breadcrumb: BreadcrumbComponent,
              private dataApi: DataApiService,
              private authService: AuthService,
              private router: Router) {
  }


  ngOnInit() {
    this.profile = this.ticketService.ticketInformation.profile;
    this.contracts = this.ticketService.ticketInformation.contracts;
    this.selectedContractType = this.contracts[this.profile.contract];

    this.setBreadCrumb();
    this.getCurrentUser();

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

  nextPage() {
    this.ticketService.ticketInformation.personalInformation = this.profile;
    this.router.navigate(['step2']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
