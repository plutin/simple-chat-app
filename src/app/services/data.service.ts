import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UtilsService} from "./utils.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private channelSelection = new BehaviorSubject({channelId: 'Default Channel', chatOwnerId: 0});
  currentChatChannel = this.channelSelection.asObservable();

  private usersListUpdated = new BehaviorSubject(false);
  currentState = this.usersListUpdated.asObservable();

  constructor(private utilsService: UtilsService) { }

  getCurrentChannel() {
    return this.currentChatChannel;
  }

  setActiveChannel(channelId: string, chatOwnerId: number) {
    this.channelSelection.next({channelId,  chatOwnerId});
  }

  updateUsersListStatus(updated: boolean) {
    this.usersListUpdated.next(updated);
  }

  getUsersListStatus() {
    return this.currentState;
  }
}
