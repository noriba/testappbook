import {Component,OnInit} from '@angular/core';
import { TicketService } from '../../stepsdemo/ticketservice';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {DataApiService} from '../../services/data-api.service';
import {AuthService} from '../../services/auth.service';
import { Route } from '@angular/compiler/src/core';
import {MenuItem} from 'primeng/api';
import {Subscription} from 'rxjs';
import {Breadcrumb} from 'primeng/breadcrumb';
import {ViewChild, AfterViewInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {RadioButtonModule} from 'primeng/radiobutton';
import {StepsModule} from 'primeng/steps';
import { SelectItem } from 'primeng/api';
import {Product} from '../../models/products';
import {ProductService} from '../../services/product.service';
import {Observable} from 'rxjs/internal/Observable';
import {ReplaySubject} from 'rxjs';


@Component({
  selector:'app-step2',
  templateUrl: './step2.html',
  providers: [MessageService]
})
export class Step2 implements OnInit , AfterViewInit {

  constructor(public dataApi: DataApiService,
              private authService: AuthService,
              private productService: ProductService,
              private router: Router,
              private messageService: MessageService) {  }

  @ViewChild(BreadcrumbComponent, { static: false }) child: BreadcrumbComponent;

  private isAdmin: any;
  private userUid: string;
  USERS: any;
  items: MenuItem[];
  steps: MenuItem[];
  home: MenuItem;
  activeIndex: number ;
  jours: string[];
  products: Product[];
  statuses: SelectItem[];
  clonedProducts: { [s: string]: Product; } = {};

  ngOnInit() {
    this.setsteps();
    this.getCurrentUser();
    this.jours = this.productService.jours;
    this.productService.getProductsSmall().then(data => this.products = data);
    this.statuses = [
      {label: 'In Stock', value: 'INSTOCK'},
      {label: 'Low Stock', value: 'LOWSTOCK'},
      {label: 'Out of Stock', value: 'OUTOFSTOCK'}]
  }

  onRowEditInit(product: Product, ri : number) {
    console.log("EDITING.....");

    this.clonedProducts[product.id] = {...product};
    //this.clonedProduct= product ;
    this.dataApi.selectedProduct = this.clonedProducts[product.id];
    this.dataApi.selectedRow = ri;
    console.log("Selected product to editing ...  "+ JSON.stringify(Object.assign({}, product)) )
  }

  onRowEditSave(product: Product) {
    console.log("SAVING..... "+ product.immatriculation);


  }

  onRowEditCancel(product: Product, index: number) {
    console.log("CANCELlING..... " + product.immatriculation);
    this.products[index] = this.clonedProducts[product.id];
    delete this.clonedProducts[product.id];
  }

  ngAfterViewInit() {
    this.child.activeIndex=1;
  }

  lastStepPlease(){
    this.router.navigate(['step1']);
  }

  nextStepPlease(){
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
