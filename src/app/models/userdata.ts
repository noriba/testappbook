import {Roles} from './roles';


export interface UserData {
  id?: string;
  userUid?: string;
  firstname?: string;
  lastname?: string;
  matricule?: string;
  contract?: string;
  site?: string;
  agency?: string;
  phonenumber?: string;
  email?: string;
  function?: string;
  numberplate?: string;
  manager?: string;
  vancode?: string;
  depotcode?: string;
  sectorcode?: string;
  weekhoursplanned?: number;
  password?: string;
  photoUrl?: string;
  roles?: Roles;
}

let USERS;
USERS = [
  {
    'id': 1,
    'name': 'Leanne Graham',
    'email': 'sincere@april.biz',
    'phone': '1-770-736-8031 x56442'
  },
  {
    'id': 2,
    'name': 'Ervin Howell',
    'email': 'shanna@melissa.tv',
    'phone': '010-692-6593 x09125'
  },
  {
    'id': 3,
    'name': 'Clementine Bauch',
    'email': 'nathan@yesenia.net',
    'phone': '1-463-123-4447',
  },
  {
    'id': 4,
    'name': 'Patricia Lebsack',
    'email': 'julianne@kory.org',
    'phone': '493-170-9623 x156'
  },
  {
    'id': 5,
    'name': 'Chelsey Dietrich',
    'email': 'lucio@annie.ca',
    'phone': '(254)954-1289'
  },
  {
    'id': 6,
    'name': 'Mrs. Dennis',
    'email': 'karley@jasper.info',
    'phone': '1-477-935-8478 x6430'
  }
];
