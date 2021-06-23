import {Component, Injectable, OnInit} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {Subscription} from 'rxjs';
import {TicketService} from '../../stepsdemo/ticketservice';
import {DataApiService} from '../../services/data-api.service';
import {AuthService} from '../../services/auth.service';
import {RouterModule, Router, ActivatedRoute} from '@angular/router';
import {BreadcrumbService} from '../../services/breadcrumb.service';
import { Steps } from 'primeng/steps';
import {NgModule,ElementRef,OnDestroy,Input,Output,EventEmitter,AfterContentInit,
  ContentChildren,QueryList,TemplateRef,EmbeddedViewRef,ViewContainerRef,ChangeDetectorRef,ChangeDetectionStrategy, ViewEncapsulation, ViewChild, AfterViewChecked, forwardRef, Inject} from '@angular/core';
import {  Renderer2 } from '@angular/core';
import { stripSummaryForJitFileSuffix } from '@angular/compiler/src/aot/util';


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
  steps: MenuItem[];
  home: MenuItem;
  submitted: boolean = false;
  contracts: any[];
  selectedContractType: any = null;
  subscription: Subscription;
  crumbs$: any;

  @ViewChild('stepsDiv') elRef2: ElementRef;


  constructor(public messageService: MessageService,
              public ticketService: TicketService,
              private dataApi: DataApiService,
              private breadservice: BreadcrumbService,
              private authService: AuthService,
              private renderer: Renderer2,
              private router: Router,
              private route:ActivatedRoute,
              private cd: ChangeDetectorRef) {  }

  ngOnInit(): void {
    this.crumbs$ = this.breadservice.getCrumbs();
    //this.setBreadCrumb();
    this.setsteps();
  }
  @Output() activeIndexChange: EventEmitter<number> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('stepper') stepper: Steps;
  public activeIndex = 0;

/*  public stepperChanged(step) {
    step++;
    this.activeIndexChange.emit(step);
    this.onChange.emit({originalEvent: event, index: step});
    console.log("stepper increased"+step);
  }

  public goToStep(step: number) {
    step++;
    this.stepper.activeIndexChange.emit(step);
  }*/
  nextStepPlease() {
    this.activeIndex++;
    //You need to override steps folder in below path to resolve error in this file
    //path =>  project-name\node_modules\primeng\components\
    Steps.prototype.itemClick(event, Steps.prototype, this.activeIndex);
    let lists = this.elRef2.nativeElement.querySelectorAll('li');
    for (let i = 0; i <= this.activeIndex - 1; i++) {
      this.renderer.setStyle(lists[i], 'background', 'green');
      this.renderer.setStyle(lists[i], 'opacity', '1');
      this.renderer.addClass(lists[i], 'anyClassIfWantToAdd');
    }
    this.renderer.setStyle(lists[this.activeIndex], 'background', '#186ba0');
    this.renderer.setStyle(lists[this.activeIndex], 'opacity', '1');

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
        label: 'Seat',
        command: (event: any) => {
          this.activeIndex = 2;
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
    this.subscription = this.ticketService.paymentComplete$.subscribe((personalInformation) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Order submitted',
        detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.'
      });
    });

  }

}
