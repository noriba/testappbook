import {Component,OnInit} from '@angular/core';
import { TicketService } from './ticketservice';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import {BreadcrumbComponent} from '../components/breadcrumb/breadcrumb.component';


@Component({
  templateUrl: './step2.html',
  providers: [MessageService]

})
export class Step2 implements OnInit {

  constructor(public ticketService: TicketService,
              private breadcrumb: BreadcrumbComponent,
              private router: Router) {
    this.breadcrumb.activeIndex=2 ;

  }

  classes: any[];

  vagons: any[];

  seats: any[];

  seatInformation: any;

  ngOnInit() {
    this.seatInformation = this.ticketService.ticketInformation.seatInformation;
    this.classes = [
      {name: 'First Class', code: 'A', factor: 1},
      {name: 'Second Class', code: 'B', factor: 2},
      {name: 'Third Class', code: 'C', factor: 3}
    ];
  }

  setVagons(event) {
    if (this.seatInformation.class && event.value) {
      this.vagons = [];
      this.seats = [];
      for (let i = 1; i < 3 * event.value.factor; i++) {
        this.vagons.push({wagon: i + event.value.code, type: event.value.name, factor: event.value.factor});
      }
    }
  }

  setSeats(event) {
    if (this.seatInformation.wagon && event.value) {
      this.seats = [];
      for (let i = 1; i < 10 * event.value.factor; i++) {
        this.seats.push({seat: i, type: event.value.type});
      }
    }
  }

  nextPage() {

    this.ticketService.ticketInformation.seatInformation = this.seatInformation;
    this.router.navigate(['step3']);
  }

  prevPage() {
    this.router.navigate(['step1']);
  }
}
