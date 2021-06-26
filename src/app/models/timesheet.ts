export interface Timesheet {
  id?: number;
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
  day?: number;
  numberplate?: number;
  mileage?: number;
  daystart?: number;
  dayend?: number;
  pause?: number;
  createdate?: number;
}

export interface Statusmanager {
  status?: boolean;
  comment?: string;
  signaturedate?: string;
  signature?: string;
}



export let TIMESHEETS;
TIMESHEETS = [
  {
    "year": 2021,
    "matricule": "azerty",
    firstname: "rachid",
    "lastname": "boulawane",
    "site": "paris la defense",
    "contracttype": "CDI",
    "week": 25,
    "weekstart": 1,
    "weekend": 7,
    "weekactivities": [
      {
        "day": "lundi",
        "numberplate": "46ANWWW59",
        "mileage": 14,
        "daystart": "2014-01-01T23:28:56.782Z",
        "dayend": "2014-01-01T23:28:56.782Z",
        "pause": 20,
        "createdate": "2014-01-01T23:28:56.782Z"
      },
      {
        "day": "Mardi",
        "numberplate": "46ANWWW59",
        "mileage": 14,
        "daystart": "2014-01-01T23:28:56.782Z",
        "dayend": "2014-01-01T23:28:56.782Z",
        "pause": 20,
        "createdate": "2014-01-01T23:28:56.782Z"
      },
      {
        "day": "Mercredi",
        "numberplate": "46ANWWW59",
        "mileage": 14,
        "daystart": "2014-01-01T23:28:56.782Z",
        "dayend": "2014-01-01T23:28:56.782Z",
        "pause": 20,
        "createdate": "2014-01-01T23:28:56.782Z"
      },
      {
        "day": "Jeudi",
        "numberplate": "46ANWWW59",
        "mileage": 14,
        "daystart": "2014-01-01T23:28:56.782Z",
        "dayend": "2014-01-01T23:28:56.782Z",
        "pause": 20,
        "createdate": "2014-01-01T23:28:56.782Z"
      },
      {
        "day": "Vendredi",
        "numberplate": "46ANWWW59",
        "mileage": 14,
        "daystart": "2014-01-01T23:28:56.782Z",
        "dayend": "2014-01-01T23:28:56.782Z",
        "pause": 20,
        "createdate": "2014-01-01T23:28:56.782Z"
      },
      {
        "day": "Samedi",
        "numberplate": "46ANWWW59",
        "mileage": 14,
        "daystart": "2014-01-01T23:28:56.782Z",
        "dayend": "2014-01-01T23:28:56.782Z",
        "pause": 20,
        "createdate": "2014-01-01T23:28:56.782Z"
      },
      {
        "day": "Dimanche",
        "numberplate": "46ANWWW59",
        "mileage": 14,
        "daystart": "2014-01-01T23:28:56.782Z",
        "dayend": "2014-01-01T23:28:56.782Z",
        "pause": 20,
        "createdate": "2014-01-01T23:28:56.782Z"
      }
    ],
    "weekhoursdone": 45,
    "weekhoursplanned": 35,
    "statusmanager": [{
      "status": true,
      "comment": "{single: 21}",
      "signaturedate": "2014-01-01T23:28:56.782Z",
      "signature": "0123456789"
    }]
  }
];
