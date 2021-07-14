import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iinfo } from '../models/info.model';
import {UserData} from '../models/userdata';
import {Timesheet} from '../models/timesheet';

@Injectable({
  providedIn: 'root'
})
export class SendMailServiceService {

  constructor(private http: HttpClient) { }

  sendEmail(userdata,timesheet): Observable<{UserData,Timesheet}> {
    console.log(userdata)
    console.log(timesheet)
    return this.http.post<{UserData,Timesheet} >('http://unik59.synology.me:3000/email/', {userdata,timesheet})
  }


}
