import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TicketService {

  ticketInformation = {
    personalInformation: {
      firstname: '',
      lastname: '',
      age: null
    },
    seatInformation: {
      class: null,
      wagon: null,
      seat: null
    },
    paymentInformation: {
      cardholderName:'',
      cardholderNumber:'',
      date:'',
      cvv:'',
      remember:false
    },
    contracts: [{type: 'cdi', key: 'CDI'},{type: 'cdd', key: 'CDD'},{type: 'int', key: 'INT'}],
    profile: {
      year:'',
      week:'',
      start:'',
      end:'',
      lastname:'',
      firstname:'',
      matricule:'',
      matriculem3:'',
      site:'',
      contract: 'cdi',
      hours: ''
    }
  };

  private paymentComplete = new Subject<any>();

  paymentComplete$ = this.paymentComplete.asObservable();

  getTicketInformation() {
    return this.ticketInformation;
  }

  setTicketInformation(ticketInformation) {
    this.ticketInformation = ticketInformation;
  }

  complete() {
    this.paymentComplete.next(this.ticketInformation.personalInformation);
  }
}
