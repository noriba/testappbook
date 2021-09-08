import {
  Component,
  ElementRef,
  EventEmitter,
  Injectable,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {Subscription} from 'rxjs';

import {DataApiService} from '../../services/data-api.service';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbService} from '../../services/breadcrumb.service';
import {Steps} from 'primeng/steps';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
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

              private dataApi: DataApiService,
              private breadservice: BreadcrumbService,
              private authService: AuthService,
              private renderer: Renderer2) {

  }

  @Output() activeIndexChange: EventEmitter<number> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  activeIndex = 0;
  @ViewChild('stepper', {static: true}) stepper: Steps;
  @ViewChild('stepsDiv') elRef2: ElementRef;
  @ViewChild('stepsDiv2') elRef3: ElementRef;


  ngOnInit(): void {
    this.setsteps();
  }

  message: string;

  nextStepPlease() {
    this.messageService.add({severity: 'success', summary: 'Etape validée'});
    this.length = Object.keys(this.steps$).length;
    let x = this.length - 1;
    if (this.activeIndex < x && this.activeIndex >= 0) {
      this.activeIndex++;
      this.stepper.activeIndexChange.emit(this.activeIndex);
    } else {
      this.messageService.add({severity: 'error', summary: 'ERROR'});
    }
  }

  lastStepPlease() {
    this.length = Object.keys(this.steps$).length;

    let x = this.length - 1;
    if (this.activeIndex <= x && this.activeIndex > 0) {
      this.activeIndex--;
      this.stepper.activeIndexChange.emit(this.activeIndex);
    } else {
      this.messageService.add({severity: 'error', summary: 'ERROR'});
    }
  }

  stepperChanged(step) {
    /*    this.activeIndexChange.emit(step);
        this.onChange.emit({originalEvent: event, index: step});
        let newmenu: MenuItem;
        this.stepper.model;*/
    // console.log('stepper change ::: this.stepper.activeIndex = ' + this.stepper.activeIndex);
    // console.log('stepper change ::: this.activeIndex = ' + this.activeIndex);
  }


  length: any = 0;

  nextStepPlease2() {
    this.crumbs$.subscribe(x => this.length = Object.keys(x).length);
    let x = this.length - 1;
    if (this.activeIndex < x && this.activeIndex >= 0) {
      let lists = this.elRef2.nativeElement.querySelectorAll('span:first-child');
      this.renderer.setStyle(lists[this.activeIndex + 1], 'background', '#E3F2FD');
      this.renderer.setStyle(lists[this.activeIndex + 1], 'opacity', '1');
      if (this.activeIndex >= 0) {

        this.renderer.setStyle(lists[this.activeIndex], 'background', '#ffffff');
        this.renderer.setStyle(lists[this.activeIndex], 'opacity', '1');
      }      //console.log("data ::: "+     console.log(Object.keys(this.crumbs$._event).length));
      this.activeIndex++;

    }

  }

  lastStepPlease3() {
    // Object.values(this.crumbs$.entries).length;
    let x = this.length - 1;

    if (this.activeIndex <= x && this.activeIndex >= 0) {
      let lists = this.elRef2.nativeElement.querySelectorAll('span:first-child');
      this.renderer.setStyle(lists[this.activeIndex], 'background', '#E3F2FD');
      this.renderer.setStyle(lists[this.activeIndex], 'opacity', '10');
      if (this.activeIndex < x) {
        this.renderer.setStyle(lists[this.activeIndex + 1], 'background', '#ffffff');
        this.renderer.setStyle(lists[this.activeIndex + 1], 'opacity', '10');
      }
      this.activeIndex--;

    }
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

  setsteps() {
    this.steps$ = [
      {
        label: 'Etape 1',
        command: (event: any) => {
          this.activeIndex = 0;
          this.messageService.add({severity: 'info', summary: 'Etape 1', detail: event.item.label});
        }
      }, {
        label: 'Etape 2',
        command: (event: any) => {
          this.activeIndex = 1;
          this.messageService.add({severity: 'info', summary: 'Etape 2', detail: event.item.label});
        }
      }, {
        label: 'Etape 3',
        command: (event: any) => {
          this.activeIndex = 2;
          this.messageService.add({severity: 'info', summary: 'Etape 3', detail: event.item.label});
        }
      }, {
        label: 'Etape 4',
        command: (event: any) => {
          this.activeIndex = 3;
          this.messageService.add({severity: 'info', summary: 'Etape 4', detail: event.item.label});
        }
      }];



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

   }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
