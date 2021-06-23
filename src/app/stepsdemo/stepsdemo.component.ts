import {TicketService} from './ticketservice';
import {Subscription} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {DataApiService} from '../services/data-api.service';
import {AuthService} from '../services/auth.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {RadioButtonModule} from 'primeng/radiobutton';
import {MenuItem} from 'primeng/api';
import {StepsModule} from 'primeng/steps';
import {MessageService} from 'primeng/api';
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
    this.breadcrumb.activeIndex=0 ;


    /*    this.items = [{
          label: 'Personal',
          routerLink: 'personal'
        },
          {
            label: 'Seat',
            routerLink: 'seat'
          },
          {
            label: 'Payment',
            routerLink: 'payment'
          },
          {
            label: 'Confirmation',
            routerLink: 'confirmation'
          }
        ];

        this.subscription = this.ticketService.paymentComplete$.subscribe((personalInformation) =>{
          this.messageService.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.'});
        });*/
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


    //this.submitted = true;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
