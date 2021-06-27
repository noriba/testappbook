export interface Timesheet {
  id: number;
  year?: number;
  matricule?: string;
  firstname?: string;
  lastname?: string;
  site?: string;
  contracttype?: string;
  week?: number;
  weekstart?: number;
  weekend?: number;
  weekactivities: Dayactivity[];
  weekhoursdone?: number;
  weekhoursplanned?: number;
  statusmanager: Statusmanager;
}

export interface Dayactivity {
  id: number;
  day?: string;
  numberplate?: string;
  mileage?: number;
  daystart?: string;
  dayend?: string;
  pause?: string;
  createdate?: number;
  dayovertime?: Dayovertime;
}

export interface Statusmanager {
  status?: boolean;
  comment?: string;
  signaturedate?: string;
  signature?: string;
}

export interface Dayovertime {
  day?: string;
  overtime?: string;
  reason?: string;
  overtimestatus?: boolean;
}


export let TIMESHEETS;
TIMESHEETS = [
  {
    'id': 1,
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
        'daystart': '2014-01-01T23:28:56.782Z',
        'dayend': '2014-01-01T23:28:56.782Z',
        'pause': 20,
        'createdate': '2014-01-01T23:28:56.782Z',
        'dayovertime': {
          'day': 'lundi',
          'overtime': '',
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
        'dayend': '2014-01-01T23:28:56.782Z',
        'pause': 20,
        'createdate': '2014-01-01T23:28:56.782Z',
        'dayovertime': {
          'day': 'Mardi',
          'overtime': '2014-01-01T23:28:56.782Z',
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
        'dayovertime': {'day': 'Mercredi', 'overtime': '', 'reason': '', 'overtimestatus': ''}
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
        'dayovertime': {'day': 'Jeudi', 'overtime': '', 'reason': '', 'overtimestatus': ''}
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
        'dayovertime': {'day': 'Vendredi', 'overtime': '', 'reason': '', 'overtimestatus': ''}
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
        'dayovertime': {'day': 'Samedi', 'overtime': '', 'reason': '', 'overtimestatus': ''}
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
        'dayovertime': {'day': 'Dimanche', 'overtime': '', 'reason': '', 'overtimestatus': ''}
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
