import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getSelectedChannelId(chatOwnerId: number, selectedUserId: number): string {
    return (chatOwnerId * selectedUserId) + '-chat-channel-' + (chatOwnerId + selectedUserId) ;
  }
}
