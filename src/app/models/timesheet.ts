import {Entity} from '../services/firestore-crud.service';

export class Timesheet implements Entity {
  id?: string;
  userUid?: string;
  year?: number;
  matricule?: string;
  firstname?: string;
  lastname?: string;
  site?: string;
  contracttype?: string;
  week?: number;
  weekstart?: string;
  weekend?: string;
  weekactivities?: Dayactivity[];
  weekhoursdone?: number;
  weekhoursplanned?: number;
  statusmanager?: Statusmanager;
}

export interface Dayactivity {
  id?: string;
  day?: string;
  numberplate?: string;
  mileage?: number;
  daystart?: string;
  dayend?: string;
  pause?: string;
  createdate?: number;
  dayovertime?: Dayovertime;
}


export interface Dayovertime {
  day?: string;
  overtime?: number;
  reason?: string;
  overtimestatus?: boolean;
}

export interface Statusmanager {
  status?: boolean;
  comment?: string;
  signaturedate?: string;
  signature?: string;
}

export interface Day {
  name: string,
  code: string
}

export let TIMESHEETS;
TIMESHEETS = [
  {
    'id': 1,
    'userUid': '',
    'year': 2021,
    'matricule': 'azerty',
    'firstname': 'rachid',
    'lastname': 'boulawane',
    'site': 'paris la defense',
    'contracttype': 'CDI',
    'week': 25,
    'weekstart': 1,
    'weekend': 7,
    'weekactivities': [
      {
        'id': 1,
        'day': 'lundi',
        'numberplate': '46ANWWW59',
        'mileage': 14,
        'daystart': '2014-01-01T03:28:56.782Z',
        'dayend': '2014-01-01T14:28:56.782Z',
        'pause': 20,
        'createdate': '2014-01-01T23:28:56.782Z',
        'dayovertime': {
          'day': 'lundi',
          'overtime': 0,
          'reason': '',
          'overtimestatus': ''
        }
      },
      {
        'id': 2,
        'day': 'Mardi',
        'numberplate': '46ANWWW59',
        'mileage': 14,
        'daystart': '2014-01-01T23:28:56.782Z',
        'dayend': '2014-01-02T08:28:56.782Z',
        'pause': 20,
        'createdate': '2014-01-01T23:28:56.782Z',
        'dayovertime': {
          'day': 'Mardi',
          'overtime': 0,
          'reason': 'j\'avais la chiasse cousin',
          'overtimestatus': true
        }
      },
      {
        'id': 3,
        'day': 'Mercredi',
        'numberplate': '46ANWWW59',
        'mileage': 14,
        'daystart': '2014-01-01T23:28:56.782Z',
        'dayend': '2014-01-01T23:28:56.782Z',
        'pause': 20,
        'createdate': '2014-01-01T23:28:56.782Z',
        'dayovertime': {'day': 'Mercredi', 'overtime': 0, 'reason': '', 'overtimestatus': ''}
      },
      {
        'id': 4,
        'day': 'Jeudi',
        'numberplate': '46ANWWW59',
        'mileage': 14,
        'daystart': '2014-01-01T23:28:56.782Z',
        'dayend': '2014-01-01T23:28:56.782Z',
        'pause': 20,
        'createdate': '2014-01-01T23:28:56.782Z',
        'dayovertime': {'day': 'Jeudi', 'overtime': 0, 'reason': '', 'overtimestatus': ''}
      },
      {
        'id': 5,
        'day': 'Vendredi',
        'numberplate': '46ANWWW59',
        'mileage': 14,
        'daystart': '2014-01-01T23:28:56.782Z',
        'dayend': '2014-01-01T23:28:56.782Z',
        'pause': 20,
        'createdate': '2014-01-01T23:28:56.782Z',
        'dayovertime': {'day': 'Vendredi', 'overtime': 0, 'reason': '', 'overtimestatus': ''}
      },
      {
        'id': 6,
        'day': 'Samedi',
        'numberplate': '46ANWWW59',
        'mileage': 14,
        'daystart': '2014-01-01T23:28:56.782Z',
        'dayend': '2014-01-01T23:28:56.782Z',
        'pause': 20,
        'createdate': '2014-01-01T23:28:56.782Z',
        'dayovertime': {'day': 'Samedi', 'overtime': 0, 'reason': '', 'overtimestatus': ''}
      },
      {
        'id': 7,
        'day': 'Dimanche',
        'numberplate': '46ANWWW59',
        'mileage': 14,
        'daystart': '2014-01-01T23:28:56.782Z',
        'dayend': '2014-01-01T23:28:56.782Z',
        'pause': 20,
        'createdate': '2014-01-01T23:28:56.782Z',
        'dayovertime': {'day': 'Dimanche', 'overtime': 0, 'reason': '', 'overtimestatus': ''}
      }
    ],
    'weekhoursdone': 45,
    'weekhoursplanned': 35,
    'statusmanager': [{
      'status': true,
      'comment': '{single: 21}',
      'signaturedate': '2014-01-01T23:28:56.782Z',
      'signature': '0123456789'
    }]
  }
];
