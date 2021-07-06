import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import {Timesheet} from '../models/timesheet';

@Injectable({
  providedIn: 'root'
})
export class TemplateEventEmitterService {

  invokeFirstComponentFunction = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  onFirstComponentButtonClick(timesheet : Timesheet) {

    this.invokeFirstComponentFunction.emit(timesheet);
  }
}
