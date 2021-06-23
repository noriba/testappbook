import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {Subscription} from 'rxjs';
import {TicketService} from '../../stepsdemo/ticketservice';
import {DataApiService} from '../../services/data-api.service';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../services/breadcrumb.service';
import {Steps} from 'primeng/steps';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  providers: [MessageService]
})
@Injectable()
export class BreadcrumbComponent implements OnInit {

  items: MenuItem[];
  private isAdmin: any;
  private userUid: string;
  USERS: any;
  profile: any;
  steps$: MenuItem[];
  home: MenuItem;
  submitted: boolean = false;
  contracts: any[];
  selectedContractType: any = null;
  subscription: Subscription;
  crumbs$: any;
  inc = 0;

  constructor(public messageService: MessageService,
              public ticketService: TicketService,
              private dataApi: DataApiService,
              private breadservice: BreadcrumbService,
              private authService: AuthService,
              private renderer: Renderer2,
              private router: Router,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef) {
  }

  @Output() activeIndexChange: EventEmitter<number> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Input() activeIndex = 0;
  @ViewChild('stepper', {static: true}) stepper: Steps;
  @ViewChild('stepsDiv') elRef2: ElementRef;
  @ViewChild('stepsDiv2') elRef3: ElementRef;


  ngOnInit(): void {
    this.crumbs$ = this.breadservice.getCrumbs();
    //this.setBreadCrumb();
    this.setsteps();
    this.setsteps2();
  }


  public stepperChanged(step) {
    this.activeIndexChange.emit(step);
    this.onChange.emit({originalEvent: event, index: step});
    let newmenu: MenuItem;
    this.stepper.model;
    console.log('stepper change ::: this.stepper.activeIndex = ' + this.stepper.activeIndex);
    console.log('stepper change ::: this.activeIndex = ' + this.activeIndex);
  }

  public goToStep(step: number) {
    step++;
    this.stepper.activeIndexChange.emit(step);
  }


  nextStepPlease() {
    this.inc++;
    this.stepper.activeIndexChange.emit(this.inc);
  }

  nextStepPlease2() {

    this.activeIndex++;
    let lists = this.elRef2.nativeElement.querySelectorAll('span:first-child');
    this.renderer.setStyle(lists[this.activeIndex], 'background', '#E3F2FD');
    this.renderer.setStyle(lists[this.activeIndex], 'opacity', '10');
    this.renderer.setStyle(lists[this.activeIndex - 1], 'background', '#ffffff');
    this.renderer.setStyle(lists[this.activeIndex - 1], 'opacity', '10');
    console.log(Object.entries(this.crumbs$));
    console.log(JSON.stringify(Object.entries(this.crumbs$).toString()));
  }

  lastStepPlease3() {
    // Object.values(this.crumbs$.entries).length;
    this.activeIndex--;
    let lists = this.elRef2.nativeElement.querySelectorAll('span:first-child');
    this.renderer.setStyle(lists[this.activeIndex], 'background', '#E3F2FD');
    this.renderer.setStyle(lists[this.activeIndex], 'opacity', '10');
    this.renderer.setStyle(lists[this.activeIndex + 1], 'background', '#ffffff');
    this.renderer.setStyle(lists[this.activeIndex + 1], 'opacity', '10');
    console.log(Object.keys(this.crumbs$).length);
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

  openPDF() {
  }

  setsteps() {
    this.steps$ = [
      {
        label: 'hello',
        command: (event: any) => {
          this.activeIndex = 0;
          this.messageService.add({severity: 'info', summary: 'First Step', detail: event.item.label});
        }
      }, {
        label: 'Seat',
        command: (event: any) => {
          this.activeIndex = 1;
          this.messageService.add({severity: 'info', summary: 'Seat Selection', detail: event.item.label});
        }
      }, {
        label: 'Seat',
        command: (event: any) => {
          this.activeIndex = 2;
          this.messageService.add({severity: 'info', summary: 'Seat Selection', detail: event.item.label});
        }
      }, {
        label: 'Confirmation',
        command: (event: any) => {
          this.activeIndex = 3;
          this.messageService.add({severity: 'info', summary: 'Last Step', detail: event.item.label});
        }
      }];

    this.subscription = this.ticketService.paymentComplete$.subscribe((personalInformation) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Order submitted',
        detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.'
      });
    });

  }

  setsteps2() {
    this.items = [{
      label: 'Farid',
      routerLink: 'personal'
    },
      {
        label: 't es',
        routerLink: 'seat'
      },
      {
        label: 'un',
        routerLink: 'payment'
      },
      {
        label: 'bogoss',
        routerLink: 'confirmation'
      }
    ];

    this.subscription = this.ticketService.paymentComplete$.subscribe((personalInformation) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Order submitted',
        detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.'
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
