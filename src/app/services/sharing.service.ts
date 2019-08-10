import { Injectable } from '@angular/core';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  storageName = 'Settings';
  constructor() { }
  setSettings(itemName, data: any) {
    localStorage.setItem(itemName, JSON.stringify(data));
  }

  getUserSettings(itemName: string) {
    const data = localStorage.getItem(itemName);
    return (data !== null ? JSON.parse(data) : data);
  }

  clearUserSettings() {
    localStorage.removeItem(this.storageName);
  }

  cleanAll() {
    localStorage.clear();
  }
  getUsers(): User[] {
     return [
      { id: 1,
         avatar: 'https://bootdey.com/img/Content/avatar/avatar1.png',
         name: 'Pavel',
         time: '1565378796425',
         status: 'offline',
         selected: false
       },
       { id: 2,
         avatar: 'https://bootdey.com/img/Content/avatar/avatar2.png',
         name: 'Tal',
         time: '1565378796425',
         status: 'offline',
         selected: false
       },
       { id: 3,
         avatar: 'https://bootdey.com/img/Content/avatar/avatar3.png',
         name: 'Shay',
         time: '1565378796425',
         status: 'online',
         selected: false
       },
       { id: 4,
         avatar: 'https://bootdey.com/img/Content/avatar/avatar4.png',
         name: 'Kobi',
         time: '1565378796425',
         status: 'offline',
         selected: false
       },
       { id: 5,
         avatar: 'https://bootdey.com/img/Content/avatar/avatar5.png',
         name: 'Ofir',
         time: '1565378796425',
         status: 'offline',
         selected: false
       },
       { id: 6,
         avatar: 'https://bootdey.com/img/Content/avatar/avatar6.png',
         name: 'Regev',
         time: '1565378796425',
         status: 'online',
         selected: false
       }
       ];
  }
}
